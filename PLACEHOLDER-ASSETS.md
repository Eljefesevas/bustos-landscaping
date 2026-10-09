# Temporary assets

All illustrations and the logo are original local SVG placeholders, not official branding, actual team/equipment, or completed customer projects. No external images are used.

| File | Appears in | Replacement | License |
|---|---|---|---|
| `public/assets/hero/after/driveway.svg` | Hero and comparison sliders | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
| `public/assets/hero/before/driveway.svg` | Hero and comparison sliders | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |
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
| `public/assets/logo/temporary-logo.svg` | Header and footer | Replace with the matching approved company photo/logo. | Original local SVG; no external license or attribution required. |

## Replacement instructions
Save approved photos in `public/assets/images/` and update filenames in `src/lib/data.ts`, `src/components/Sections.tsx`, and `src/components/Gallery.tsx`. Use matching camera perspectives for `public/assets/hero/before/` and `after/`; update `Hero.tsx` and `Gallery.tsx` if extensions change. Replace the temporary logo in `public/assets/logo/` and update Navigation.tsx and Sections.tsx if its dimensions change. Update alt text and remove temporary labels only after real assets are approved.

The three comparison cards intentionally reuse one matching illustration pair. Replace each with a separate actual before/after project when supplied.

## Animation
The desktop hero uses GSAP ScrollTrigger pinning, a 2D crack overlay, a dust gradient, and a clipped image reveal. This is not realistic 3D destruction. Future rendered frames belong in `public/assets/hero/frames/`; replace the transition in `src/components/Hero.tsx` when these are available. Mobile and reduced-motion visitors see the final static scene.

Reviews are labeled placeholders. Replace only with authentic supplied reviews; no ratings or customer names are invented. Fonts use local system fallbacks until licensed font files are supplied.
