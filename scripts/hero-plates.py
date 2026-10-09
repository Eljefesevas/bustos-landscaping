# Generates the Garden Reveal plates (public/assets/hero/garden/) from one photograph.
# Tuned for the current Unsplash photo: the bed-zone polygons and the house-number patch
# are in that photo's 2800x2100 pixel space and must be redrawn for a replacement photo.
# Usage: python3 scripts/hero-plates.py <source-2800x2100.jpg>   (needs numpy, pillow, scipy)
# Writes scene-clean.png (after), before-full.png (beds cleared to graded mulch) and mask-full.png;
# web plates are resized from those (2000w, 1200w) plus a portrait crop (box 1450,880,2350,2100).
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as ndi

SRC = sys.argv[1] if len(sys.argv) > 1 else 'src-2800.jpg'
# --- remove the house number by cloning wall stone from its left
a = np.asarray(Image.open(SRC).convert('RGB')).astype(np.float32)
x0, x1, y0, y1 = 1718, 1818, 1562, 1656
src = a[y0:y1, x0-100:x1-100].copy()
fy, fx = np.mgrid[0:y1-y0, 0:x1-x0]
w = np.clip(np.minimum.reduce([fx, (x1-x0-1)-fx, fy, (y1-y0-1)-fy]).astype(np.float32)/10, 0, 1)[..., None]
a[y0:y1, x0:x1] = a[y0:y1, x0:x1]*(1-w) + src*w
Image.fromarray(a.clip(0, 255).astype(np.uint8)).save('scene-clean.png')

from PIL import Image, ImageDraw, ImageFilter
im=Image.open('scene-clean.png').convert('RGB'); W,H=im.size
a=np.asarray(im).astype(np.float32)/255
hsv=np.asarray(im.convert('HSV')).astype(np.float32)/255
h,s,v=hsv[...,0]*360,hsv[...,1],hsv[...,2]
green=(h>=50)&(h<=190)&(s>0.13)&(v>0.06)
sage=(h>=70)&(h<=170)&(s>0.09)&(v>0.3)
yellow=(h>=38)&(h<50)&(s>0.5)
purple=((h>=255)|(h<=10))&(s>0.2)&(v>0.08)
veg=(green|sage|yellow|purple).astype(np.float32)
near=ndi.uniform_filter(veg,31)
veg=np.maximum(veg,((v<0.2)&(near>0.5)).astype(np.float32))
def poly(pts,blur=0):
    z=Image.new('L',(W,H),0); ImageDraw.Draw(z).polygon(pts,fill=255)
    if blur: z=z.filter(ImageFilter.GaussianBlur(blur))
    return np.asarray(z).astype(np.float32)/255
# planting zones: every bed, the bougainvillea and the lower-left bed
zone=np.clip(
  poly([(640,1060),(1250,1000),(1600,1020),(1900,1060),(2300,1070),(2800,1040),(2800,1800),(2660,1800),(2560,1640),(2420,1500),(2000,1420),(1880,1500),(1260,1500),(1240,1390),(900,1380),(640,1300)])
 +poly([(0,1080),(390,1100),(390,1520),(0,1540)])
 +poly([(0,1620),(330,1640),(380,1700),(470,2100),(0,2100)]),0,1)
vb=ndi.binary_closing(veg>0.5,structure=np.ones((9,9)))
vb=ndi.binary_opening(vb,structure=np.ones((3,3)))
vb=vb&(zone>0.5)
# soil horizon: below it a cleared plant becomes mulch, above it the backdrop is rebuilt
xs=np.array([0,390,640,900,1240,1300,1500,1700,2000,2300,2600,2800]); ys=np.array([1560,1560,1290,1290,1290,1170,1140,1125,1135,1150,1165,1180])
soilTop=np.interp(np.arange(W),xs,ys)
yy,xx=np.mgrid[0:H,0:W]
below=yy>=soilTop[None,:]
dark_in_bed=(zone>0.5)&below&(v<0.24)&(xx<2700)
ground=(vb&below)|dark_in_bed|( (poly([(0,1620),(330,1640),(380,1700),(470,2100),(0,2100)])>0.5)&vb )
hole=vb&~ground&~((xx>1700)&~below)
hole_d=ndi.binary_dilation(hole,iterations=2)
rng=np.random.default_rng(3)
# above the soil line (plant tips against the house and hedge): dormant straw tones, texture kept
lum0=a@np.array([.299,.587,.114],np.float32)
dl=ndi.gaussian_filter(lum0,1.0)[...,None]
fill=np.clip(np.array([0.64,0.58,0.47],np.float32)*(0.3+0.95*dl),0,1)
# mulch: tiled real bark patch, lifted and warmed, lit by the scene's broad light
patch=np.asarray(Image.open(SRC).crop((20,1730,280,1830))).astype(np.float32)/255
patch=patch/(ndi.gaussian_filter(patch,(14,14,0))+1e-3)*patch.mean()  # high-pass: keep chip detail, drop light gradients
pt=np.concatenate([patch,patch[:,::-1]],1); pt=np.concatenate([pt,pt[::-1]],0)
ty=H//pt.shape[0]+2; tx=W//pt.shape[1]+2
def tile(arr,oy,ox): return np.tile(arr,(ty+1,tx+1,1))[oy:H+oy,ox:W+ox]
t1=tile(pt,0,0); t2=tile(np.rot90(pt,2).copy(),137,211); t3=tile(pt[:,::-1].copy(),61,293)
def lowfreq(seed):
    r=np.random.default_rng(seed); n=ndi.gaussian_filter(r.random((H//16,W//16)),3); n=(n-n.min())/(n.max()-n.min())
    return np.asarray(Image.fromarray((n*255).astype(np.uint8)).resize((W,H),Image.BICUBIC)).astype(np.float32)[...,None]/255
w1,w2,w3=lowfreq(1)**2+0.05,lowfreq(2)**2+0.05,lowfreq(4)**2+0.05
soil=(t1*w1+t2*w2+t3*w3)/(w1+w2+w3)
sl=soil.mean(-1,keepdims=True); soil=(soil-sl)*0.35+sl; soil=soil/(soil.mean()+1e-6)
lum=a@np.array([.299,.587,.114],np.float32)
light=ndi.gaussian_filter(lum,40)[...,None]
earth=np.array([0.4,0.32,0.25],np.float32)
soil=np.clip(earth*soil*(0.5+1.05*light),0,1)
gm=ndi.gaussian_filter(ground.astype(np.float32),1.5)[...,None]
hm2=ndi.gaussian_filter(hole_d.astype(np.float32),2.0)[...,None]
before=a*(1-hm2)+fill*hm2
before=before*(1-gm)+soil*gm
Image.fromarray((before*255).clip(0,255).astype(np.uint8)).save('before-full.png')
# growth map: coverage, delay, height within each plant run
m=ndi.gaussian_filter(np.maximum(vb,hole_d).astype(np.float32),1.6)
mb=m>0.3; rel=np.zeros((H,W),np.float32)
for x in range(W):
    col=mb[:,x]; idx=np.flatnonzero(np.diff(np.r_[0,col.astype(np.int8),0]))
    for s0,e0 in zip(idx[::2],idx[1::2]):
        n=e0-s0
        if n>1: rel[s0:e0,x]=np.linspace(1,0,n)
rel=ndi.gaussian_filter(rel,4)
def noise(scale,sig):
    n=ndi.gaussian_filter(rng.random((H//scale,W//scale)),sig); n=(n-n.min())/(n.max()-n.min())
    return np.asarray(Image.fromarray((n*255).astype(np.uint8)).resize((W,H),Image.BICUBIC)).astype(np.float32)/255
delay=0.6*noise(8,7)+0.4*(1-yy/H)
lo,hi=np.percentile(delay[mb],1),np.percentile(delay[mb],99)
delay=np.clip((delay-lo)/(hi-lo),0,1)
Image.fromarray((np.stack([m,delay,rel],-1)*255).clip(0,255).astype(np.uint8)).save('mask-full.png')
