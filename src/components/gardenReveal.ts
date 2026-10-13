// WebGL renderer for the homepage Garden Reveal.
// The original growth map reveals an unfiltered color photo over its CSS-grayscale twin.
// Both layers use the same fixed cover crop; only the reveal coverage changes.

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
uniform sampler2D uAfter;
uniform sampler2D uMask;
uniform float uP;
uniform vec2 uScale;
uniform vec2 uCenter;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
}
void main(){
  float p = uP;
  vec2 uv = uCenter + (vUv - 0.5) * uScale;

  vec4 m = texture2D(uMask, uv);
  float local = clamp((p * 1.32 - 0.14 - m.g * 0.66) / 0.4, 0.0, 1.0);
  float edge = (vnoise(uv * vec2(340.0, 260.0)) - 0.5) * 0.18 + (vnoise(uv * vec2(60.0, 40.0)) - 0.5) * 0.1;
  float grown = smoothstep(m.b + edge - 0.1, m.b + edge + 0.03, local * 1.14);

  // Normalize the existing reveal so its endpoints are fully grayscale and full color.
  float initial = smoothstep(m.b + edge - 0.1, m.b + edge + 0.03, 0.0);
  float finished = smoothstep(m.b + edge - 0.1, m.b + edge + 0.03, 1.14);
  float coverage = finished - initial < 0.0001 ? local : clamp((grown - initial) / (finished - initial), 0.0, 1.0);
  gl_FragColor = vec4(texture2D(uAfter, uv).rgb, coverage);

}`;

export type GardenSources = { after: string; mask: string; aspect: number; focus: [number, number] };

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
  const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: false, powerPreference: 'high-performance' });
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

  const [after, mask] = await Promise.all([loadImage(sources.after), loadImage(sources.mask)]);
  const textures = [after, mask].map((img, unit) => {
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
  gl.uniform1i(gl.getUniformLocation(program, 'uAfter'), 0);
  gl.uniform1i(gl.getUniformLocation(program, 'uMask'), 1);
  const uP = gl.getUniformLocation(program, 'uP');
  const uScale = gl.getUniformLocation(program, 'uScale');
  const uCenter = gl.getUniformLocation(program, 'uCenter');

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
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const scale = aspect > sources.aspect ? [1, sources.aspect / aspect] : [aspect / sources.aspect, 1];
    const focus = sources.focus;
    // Match CSS object-position exactly, without progress-dependent zoom or drift.
    const center = [scale[0] / 2 + focus[0] * (1 - scale[0]), scale[1] / 2 + focus[1] * (1 - scale[1])];
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    textures.forEach((tex, unit) => { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tex); });
    gl.uniform1f(uP, progress);
    gl.uniform2f(uScale, scale[0], scale[1]);
    gl.uniform2f(uCenter, center[0], center[1]);
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
