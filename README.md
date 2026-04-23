# Ben Speedy — Index of Work

Static portfolio site. Next.js 15 (App Router), TypeScript, single-file content store.
Builds to a static folder you can host anywhere (Netlify, Vercel, GitHub Pages, S3, your own server).

## Local development

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Adding or editing projects

All project data lives in **`src/data/projects.ts`**. One file. To add a new project:

1. Drop your images into `public/projects/<your-project-slug>/`.
2. Open `src/data/projects.ts`, copy any project block, paste it where you want it to appear in the helix order, and edit the fields.
3. Save. The dev server hot-reloads. The new card appears in the helix and the side index.

The schema is type-checked. If you forget a required field or use an invalid `status` value, TypeScript will tell you.

```ts
{
  id: "grange-road-house",        // unique slug, used as React key
  number: "13",                    // displayed on the card and in the index
  title: "Grange Road House",
  year: "2025",
  location: "Grey Lynn, Auckland",
  status: "Built",                 // Built | Under construction | Consented | Design | Concept | Unbuilt
  type: "Residential alteration",
  role: "Architect",
  description: "Two or three sentences. Brief, materiality, the key move.",
  hero: "/projects/grange-road-house/hero.jpg",
  gallery: [
    "/projects/grange-road-house/01.jpg",
    "/projects/grange-road-house/02.jpg",
  ],
}
```

Image paths are relative to `/public`. So `/projects/foo/01.jpg` lives at `public/projects/foo/01.jpg` in the repo.

### Image guidance

- Hero: 4:3 ratio works best in the panel. 1600px wide minimum.
- Gallery: any ratio, served at 4:3 in the panel. Same minimum width.
- Use JPG for photos, PNG for drawings, SVG for diagrams.
- Compress before committing. [Squoosh](https://squoosh.app) or `sharp-cli` are fine.

## Tweaking the helix

The site has a live "tweak" panel in the bottom-right corner of the helix view. Click it to expand sliders for radius, ring spacing, rotation speed, focus pop, damping, zoom, and pan. Changes apply instantly. Click "reset" to restore defaults. The defaults live in `src/components/HelixPortfolio.tsx`:

```ts
const TWEAK_DEFAULTS = {
  helixRadius: 580,        // distance from centre axis
  ringSpacing: 380,        // vertical gap between rings of cards
  autoRotateSpeed: 14,     // degrees per second when idle
  velocityDamping: 0.0001, // how quickly drag inertia decays
  focusDistance: 100,      // how far a focused card pushes towards the camera
  zoom: 0.5,               // overall scale of the helix
  centerX: 310,            // horizontal pan in px
  centerY: 230,            // vertical pan in px
};
```

Once you've found values you like via the sliders, copy them into `TWEAK_DEFAULTS` so they become the load-state for everyone.

`CARDS_PER_RING` (default 4) controls how many cards sit on each ring. Edit the constant directly in the same file. At 12 projects with 4 per ring you get 3 rings.

## Deployment

The site is configured for **static export** (`output: 'export'` in `next.config.ts`). Build, then upload the `out/` folder.

```bash
npm run build
```

This produces a static `out/` directory.

### Netlify (drag and drop)

1. Run `npm run build`.
2. Go to https://app.netlify.com/drop.
3. Drag the `out/` folder onto the page.

Site is live in seconds at a `*.netlify.app` URL. Add a custom domain in Netlify settings.

### Netlify (Git-connected, recommended)

1. Push the repo to GitHub.
2. Netlify → Add new site → Import from Git.
3. Build command: `npm run build`. Publish directory: `out`.
4. Every push to `main` auto-deploys.

### Vercel

```bash
npx vercel
```

Follow the prompts. Vercel detects Next.js automatically.

### GitHub Pages

1. Push to GitHub.
2. Settings → Pages → Source: GitHub Actions.
3. Use the official Next.js static export workflow.

### Anywhere else

The `out/` folder is plain HTML, CSS, JS, and images. Upload via FTP, drop in S3 + CloudFront, serve from nginx. Pick your poison.

## File map

```
src/
  app/
    layout.tsx          # html shell, fonts, metadata
    page.tsx            # home page (renders HelixPortfolio)
    globals.css         # site-wide styles
  components/
    HelixPortfolio.tsx  # the entire interactive UI
  data/
    projects.ts         # ← edit this to add projects
public/
  projects/
    placeholder/        # swap these out with real photos
```

## Notes

- The helix is desktop-only. Mobile (< 768px) shows a stacked vertical list of cards.
- Press Escape or click outside a card to close the detail panel.
- Respects `prefers-reduced-motion`. Auto-rotation pauses for users with that setting.
