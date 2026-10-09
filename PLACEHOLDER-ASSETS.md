# Temporary assets

All illustrations and the logo are original local SVG placeholders, not official branding, actual team/equipment, or completed customer projects. The only external image is the homepage hero photograph (see below), which is free-license stock labeled on the page as a concept scene.

| File | Appears in | Replacement | License |
|---|---|---|---|
| `public/assets/hero/after/driveway.svg` | Comparison sliders | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
| `public/assets/hero/before/driveway.svg` | Comparison sliders | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
| `public/assets/hero/garden/after-*.jpg` | Homepage hero, finished state (2000w, 1200w, portrait crop) | Replace with an approved photo of a finished Bustos project, then regenerate the before plate and growth mask from it. | Unsplash photo by Gene Giromini (unsplash.com/photos/KTvr5e8Vvjc), Unsplash License; free for commercial use, attribution shown on the page. House number removed. |
| `public/assets/hero/garden/before-*.jpg` | Homepage hero, unfinished state: the same yard with its beds cleared to graded mulch | Regenerate from the replacement photo (or use a real before photo taken from the same position). | Derived from the photo above. |
| `public/assets/hero/garden/growth-mask*.jpg` | Homepage hero growth map (R vegetation, G delay, B plant height) | Regenerate from the replacement photo. | Derived data texture. |
| `public/assets/images/concrete.svg` | Services, project gallery, family story, or equipment gallery, according to filename | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
| `public/assets/images/excavation.svg` | Services, project gallery, family story, or equipment gallery, according to filename | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
| `public/assets/images/landscaping.svg` | Services, project gallery, family story, or equipment gallery, according to filename | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
| `public/assets/images/lawn.svg` | Services, project gallery, family story, or equipment gallery, according to filename | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
| `public/assets/images/machinery.svg` | Services, project gallery, family story, or equipment gallery, according to filename | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
| `public/assets/images/owners.svg` | Services, project gallery, family story, or equipment gallery, according to filename | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
| `public/assets/images/pavers.svg` | Services, project gallery, family story, or equipment gallery, according to filename | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
| `public/assets/images/trailer.svg` | Services, project gallery, family story, or equipment gallery, according to filename | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
| `public/assets/images/truck.svg` | Services, project gallery, family story, or equipment gallery, according to filename | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
| `public/assets/images/turf.svg` | Services, project gallery, family story, or equipment gallery, according to filename | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
| `public/assets/images/workers.svg` | Services, project gallery, family story, or equipment gallery, according to filename | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
| `public/assets/logo/temporary-logo.svg` | No longer used (replaced by the official logo below) | Can be deleted. | Original local SVG. |

## Replacement instructions
Save approved photos in `public/assets/images/` and update filenames in `src/lib/data.ts`, `src/components/Sections.tsx`, and `src/components/Gallery.tsx`. Use matching camera perspectives for `public/assets/hero/before/` and `after/`; update `Hero.tsx` and `Gallery.tsx` if extensions change. Replace the temporary logo in `public/assets/logo/` and update Navigation.tsx and Sections.tsx if its dimensions change. Update alt text and remove temporary labels only after real assets are approved.

The three comparison cards intentionally reuse one matching illustration pair. Replace each with a separate actual before/after project when supplied.

## Animation
The homepage hero ("Garden Reveal", `src/components/Hero.tsx` + `gardenReveal.ts`) pins for one and a half to two screens of scroll while a WebGL shader blends the before and after plates per plant clump. Each clump grows up from its base and settles into place as the light warms from flat overcast to late afternoon. Every plate is one real photograph, not 3D. Phones in portrait get a native-resolution crop. Reduced-motion visitors see the finished photograph with no pinning; browsers without WebGL keep the pinned scroll and crossfade the two plates. When real project photography arrives, take a matching before photo from the same camera position if possible; otherwise regenerate the before plate and growth mask from the new after photo with `scripts/hero-plates.py` (redraw its bed polygons for the new photo first). The credit line in the hero must change with the photo.

Reviews are labeled placeholders. Replace only with authentic supplied reviews; no ratings or customer names are invented. Fonts use local system fallbacks until licensed font files are supplied.

## Official brand assets (Phase 2)
| File | Used in | Source / quality |
|---|---|---|
| `public/assets/brand/bustos-logo-original.png` | Reference only | Official logo from bustoslandscaping.net. 875×875 RGB PNG on white, the best file available. No vector master was found; please supply an SVG/AI/PDF master if one exists. |
| `public/assets/brand/bustos-logo-lockup.png` | Footer, on an ivory panel | Transparent version of the full lockup. The two inks (black, #91C73E) were unmixed from the white background; recompositing on white matches the original within a mean error of 0.03/255. Not recoloured or reshaped. |
| `public/assets/brand/bustos-monogram.png` | Header, on an ivory tile | The BL mark cropped from the same file. The wordmark is unreadable at header size, so the header pairs the mark with the site name set in DM Sans. |
| `src/app/icon.png`, `src/app/apple-icon.png` | Favicon / home-screen icon | The BL mark on ivory. It stays legible at 32px. |

The black B disappears on the site's dark forest surfaces, so wherever the logo sits on dark it is placed on an ivory panel instead of being recoloured. Note that the logo's wordmark reads "BUSTOS LANDSCAPE" while the site uses "Bustos Landscaping".

## Project photographs (Phase 2)
`public/assets/work/*.jpg` are genuine Bustos Landscaping project photos from the owner's old site, reused with the owner's authorization. They were resized, their EXIF/GPS data was stripped, and some were cropped to exclude a parked car. The originals are phone photos of about 1080–2500px. On-site captions describe only what is visible; the source filenames are SEO labels, so no locations are claimed.
