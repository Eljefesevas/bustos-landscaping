// WebGL renderer for the homepage Garden Reveal.
// One photograph, two plates: the same yard with dormant planting and bare beds (before)
// and finished (after). A growth map drives the transition per plant clump:
//   R = vegetation coverage, G = growth delay, B = height within the plant (0 base, 1 top).

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform sampler2D uBefore;
uniform sampler2D uAfter;
uniform sampler2D uMask;
uniform float uP;
uniform vec2 uScale;
uniform vec2 uCenter;
uniform float uZoom;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
}
float luma(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }

void main(){
  float p = uP;
  vec2 uv = uCenter + (vUv - 0.5) * uScale / uZoom;
  // Ground plane drifts more than the house and sky: a slow, shallow camera rise.
  float depth = smoothstep(0.35, 1.0, uv.y);
  uv.y += (0.5 - p) * 0.012 * depth;

  vec4 m = texture2D(uMask, uv);
  float local = clamp((p * 1.32 - 0.14 - m.g * 0.66) / 0.4, 0.0, 1.0);
  float edge = (vnoise(uv * vec2(340.0, 260.0)) - 0.5) * 0.18 + (vnoise(uv * vec2(60.0, 40.0)) - 0.5) * 0.1;
  float grown = smoothstep(m.b + edge - 0.1, m.b + edge + 0.03, local * 1.14);

  // Plants sit slightly low while they establish, then rise into place.
  vec2 rise = vec2(0.0, -(1.0 - local) * 0.006 * m.r);
  vec3 before = texture2D(uBefore, uv).rgb;
  vec3 after = texture2D(uAfter, uv + rise).rgb;
  float young = (1.0 - smoothstep(0.2, 1.0, local)) * m.r;
  after = mix(after, after * vec3(1.05, 1.05, 0.84) + 0.025, young * 0.5);
  vec3 c = mix(before, after, grown);

  // Unfinished: flat, dusty, overcast. Hardscape sharpens first.
  float hard = smoothstep(0.0, 0.55, p);
  float l = luma(c);
  vec3 flatc = mix(vec3(l), c, 0.55);
  flatc = (flatc - 0.5) * 0.86 + 0.5 + 0.055;
  flatc = mix(flatc, vec3(0.84, 0.84, 0.82), 0.14);
  c = mix(flatc, c, hard);

  // Finished: late-afternoon light, raking in from the upper right.
  float warm = smoothstep(0.3, 1.0, p);
  vec3 base = c;
  float lg = luma(base);
  float chroma = max(base.r, max(base.g, base.b)) - min(base.r, min(base.g, base.b));
  // Greens settle toward sage and hedge rather than chartreuse.
  float greenness = clamp((base.g - max(base.r, base.b)) * 5.0, 0.0, 1.0);
  vec3 gold = mix(base, mix(vec3(lg), base, 0.8) * vec3(0.98, 1.0, 0.97), greenness * 0.55);
  float lit = smoothstep(0.4, 0.88, lg);
  float dir = smoothstep(0.1, 1.1, uv.x * 0.85 + (1.0 - uv.y) * 0.3);
  gold *= mix(vec3(0.97, 0.985, 1.01), vec3(1.08, 1.015, 0.9), lit * (0.35 + 0.65 * dir));
  // Stucco and paper whites stay clean.
  float white = smoothstep(0.76, 0.94, lg) * (1.0 - smoothstep(0.08, 0.2, chroma));
  gold = mix(gold, base * vec3(1.0, 0.99, 0.96), white * 0.65);
  // Midday blue softens, with a breath of warmth toward the horizon; never olive.
  float sky = smoothstep(0.04, 0.2, base.b - base.r) * smoothstep(0.45, 0.65, lg);
  vec3 skyc = mix(vec3(lg), base, 0.74) + vec3(0.045, 0.025, 0.0) * smoothstep(0.05, 0.4, uv.y);
  gold = mix(gold, skyc, sky);
  vec2 sp = (uv - vec2(0.98, 0.1)) * vec2(1.33, 1.0);
  gold += vec3(1.0, 0.84, 0.62) * exp(-dot(sp, sp) * 3.0) * 0.12 * (1.0 - sky * 0.5);
  gold = (gold - 0.5) * 1.04 + 0.5;
  c = mix(c, gold, warm);

  vec2 q = vUv - 0.5;
  c *= 1.0 - dot(q, q) * mix(0.11, 0.22, warm);
  gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
}`;

export type GardenSources = { before: string; after: string; mask: string; aspect: number; focus: [number, number] };

export type GardenRenderer = {
  render: (progress: number) => void;
  resize: () => void;
  destroy: () => void;
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || 'compile');
  return shader;
}

export async function createGardenRenderer(canvas: HTMLCanvasElement, sources: GardenSources): Promise<GardenRenderer> {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: 'high-performance' });
  if (!gl) throw new Error('webgl');

  const program = gl.createProgram();
  if (!program) throw new Error('program');
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'link');
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const [before, after, mask] = await Promise.all([loadImage(sources.before), loadImage(sources.after), loadImage(sources.mask)]);
  const textures = [before, after, mask].map((img, unit) => {
    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    return tex;
  });
  gl.useProgram(program);
  gl.uniform1i(gl.getUniformLocation(program, 'uBefore'), 0);
  gl.uniform1i(gl.getUniformLocation(program, 'uAfter'), 1);
  gl.uniform1i(gl.getUniformLocation(program, 'uMask'), 2);
  const uP = gl.getUniformLocation(program, 'uP');
  const uScale = gl.getUniformLocation(program, 'uScale');
  const uCenter = gl.getUniformLocation(program, 'uCenter');
  const uZoom = gl.getUniformLocation(program, 'uZoom');

  let last = -1;
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    last = -1;
  };

  const render = (progress: number) => {
    if (Math.abs(progress - last) < 0.0004) return;
    last = progress;
    const aspect = canvas.width / canvas.height;
    const scale = aspect > sources.aspect ? [1, sources.aspect / aspect] : [aspect / sources.aspect, 1];
    const focus = sources.focus;
    const zoom = 1.06 - 0.06 * progress;
    const half = [scale[0] / zoom / 2, scale[1] / zoom / 2];
    const center = [Math.min(Math.max(focus[0], half[0]), 1 - half[0]), Math.min(Math.max(focus[1], half[1]), 1 - half[1])];
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    textures.forEach((tex, unit) => { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tex); });
    gl.uniform1f(uP, progress);
    gl.uniform2f(uScale, scale[0], scale[1]);
    gl.uniform2f(uCenter, center[0], center[1]);
    gl.uniform1f(uZoom, zoom);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const destroy = () => {
    textures.forEach(t => gl.deleteTexture(t));
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
  };

  resize();
  return { render, resize, destroy };
}
