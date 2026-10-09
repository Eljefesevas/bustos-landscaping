# Bustos Landscaping — local website

## Preview on your MacBook

Open Finder → Downloads → bustos-landscaping. Open this folder in your editor.

In Terminal:

```sh
cd ~/Downloads/bustos-landscaping
npm run dev
```

Open http://127.0.0.1:3000 in Safari or Chrome. Keep Terminal running; Control-C stops this project server.

An existing La Segundita server answers http://localhost:3000 over IPv6 on this Mac. It was left untouched. Bustos binds only to 127.0.0.1:3000 to coexist safely. After the existing server is stopped by its owner, you can use `npx next dev --webpack --hostname localhost --port 3000` (stop the Bustos server first) to serve at exactly http://localhost:3000. Polling is enabled in npm run dev to avoid this environment’s file-watcher limits.

## Project contents

- `src/app/`: Home, Services, Our Work, About, Contact, layout, CSS, sitemap, robots.
- `src/components/`: Hero, Navigation, Gallery, Reveal, shared Sections, Timeline.
- `src/lib/data.ts`: Services, exact family story, phone numbers.
- `public/assets/`: Temporary logo, illustration assets, hero before/after and future frames.
- `PLACEHOLDER-ASSETS.md`: Asset inventory and replacement instructions.
- Root configs: package.json and lockfile, TypeScript, ESLint, PostCSS.

No repository was initialized, nothing was pushed, and nothing was deployed. All source changes are inside this folder. The local preview blocks search indexing. Replace localhost metadata/sitemap URLs and review indexing settings only before a separately authorized publication.

## Validation

`npm run lint`, `npx tsc --noEmit`, `npm run build`.

See PLACEHOLDER-ASSETS.md for the 2D animation limitations and illustration replacement steps.
