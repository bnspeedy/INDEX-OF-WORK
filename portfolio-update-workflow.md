# Portfolio Update Workflow

Reference doc for working on studioben.co. Paste this into a new Claude chat at the start, then say what you want to do (e.g. "add a new project", "swap the process page images", "tweak the helix").

## Project context

- **Repo**: `bnspeedy/INDEX-OF-WORK` (GitHub)
- **Local path**: `~/code/ben-speedy-index/` *(moved off Desktop to avoid iCloud sync corruption)*
- **Stack**: Next.js 16 + TypeScript, hosted via auto-deploy on push to `main`
- **Live URL**: https://studioben.co
- **Routes**: `/` (helix), `/process` (essay + timeline), `/history` (CV)

## File structure that matters

```
public/projects/<slug>/      ← project images (helix)
  hero.jpg                   ← lead image (helix card)
  01.jpg, 02.jpg, ...        ← gallery, in display order

public/process/<project-slug>/  ← process page images
  *.svg or *.jpg             ← currently 7 placeholder SVGs for "modern-dwelling"

src/data/projects.ts         ← helix project metadata
src/data/processPhases.ts    ← /process page phases (7 phases for modern-dwelling)

src/app/page.tsx             ← homepage (helix)
src/app/process/page.tsx     ← /process route entry (server component)
src/app/process/ProcessClient.tsx  ← /process interactive client (essay + timeline views)
src/app/process/process.module.css ← /process styles
src/app/history/page.tsx     ← /history route (full CV, server component)
src/app/history/history.module.css ← /history styles

src/components/HelixPortfolio.tsx  ← helix UI + TopBar nav + TWEAK_DEFAULTS at line 11
src/components/SiteChrome.tsx      ← shared top/bottom bar for /process and /history
src/components/SiteChrome.module.css

src/app/globals.css          ← site styles, CSS variables, helix scroll-lock
scripts/optimise-images.js   ← batch image optimiser (sharp-based)
```

## Site nav (Work / Process / History)

Three pages share a top bar. All bars use `position: fixed` so the bar stays anchored when navigating between pages.

- The helix homepage's TopBar lives inside `HelixPortfolio.tsx` (function `TopBar` around line 495)
- `/process` and `/history` use `SiteChrome.tsx` for their top bar
- Both bars must stay visually identical (height 40px, hairline border, JetBrains Mono 11px, uppercase, 0.2em tracking, `--bg` background)

If you add a new top-level route, add a `<Link>` to it in both `HelixPortfolio.tsx` TopBar AND `SiteChrome.tsx`.

## CSS variables (globals.css)

```css
--bg: #f4f1ea;                       /* warm off-white */
--ink: #111;                         /* near-black */
--ink-soft: rgba(17, 17, 17, 0.55);
--ink-faint: rgba(17, 17, 17, 0.25);
--accent: #ff3b00;                   /* orange */
--font-instrument-serif              /* serif headings */
--font-space-grotesk                 /* sans body */
--font-jetbrains                     /* mono labels, top bar, captions */
```

Don't introduce new fonts or colours without good reason. Match these.

---

## Adding a new project (helix)

### Project schema (in projects.ts)

```typescript
{
  id: "kebab-case-slug",          // matches folder name in /public/projects/
  number: "02",                   // display number, position in helix
  title: "Project Title",
  year: "2026",                   // or "2023–2026" for ranges, or "Various"
  location: "Suburb, Region",
  status: "Built" | "Under construction" | "Consented" | "Design" | "Concept" | "Unbuilt",
  type: "New dwelling" | "Dual dwelling" | "Multi-unit residential" | "Heritage alteration + addition" | "Exhibition / public" | etc.,
  role: "Architect" | "Sole designer" | "Lead designer – client facing" | etc.,
  description: "Single paragraph, 3–5 sentences, professional architectural tone.",
  hero: "/projects/<slug>/hero.jpg",
  gallery: [
    "/projects/<slug>/01.jpg",
    "/projects/<slug>/02.jpg",
  ],
}
```

### Source folder setup (one or many projects)

Create a staging folder with one subfolder per project. Folder name becomes the slug.

```
~/Desktop/new-projects/
  hawthorn-house/
    hero.jpg          ← any extension, "hero" in basename
    01.jpg            ← gallery, prefix with 01_, 02_ for order
    IMG_4521.heic     ← HEIC, PNG, large JPEGs all fine
```

Rules: folder name = slug (kebab-case), one image per project with "hero" in basename, gallery files sort alphabetically.

### Workflow steps

1. Set up source folder (above)
2. Run the optimiser:
   ```bash
   cd ~/code/ben-speedy-index
   node scripts/optimise-images.js ~/Desktop/new-projects/ --dry-run  # preview
   node scripts/optimise-images.js ~/Desktop/new-projects/             # write for real
   ```
   Outputs to `public/projects/<slug>/` as `hero.jpg`, `01.jpg`, `02.jpg`, ... (max 2400px long edge, JPEG q82, under 400KB target, sRGB, EXIF stripped).

3. Provide project metadata to Claude (title, year, location, status, type, role, description, helix position).
4. Claude returns updated `projects.ts` as a complete file with renumbering done.
5. Drop in and deploy:
   ```bash
   cd ~/code/ben-speedy-index
   cp ~/Downloads/projects.ts src/data/projects.ts
   npm run build       # confirm no TypeScript errors
   npm run dev         # optional visual check at localhost:3000, Ctrl+C to stop
   git add .
   git commit -m "add <project name> project"
   git push
   ```
6. Auto-deploy runs on push, live in 2–3 minutes.

### Style/content rules for descriptions

- Single paragraph, 3–5 sentences
- No em dashes (commas, full stops, or restructure)
- Professional architectural tone, not marketing fluff
- No filler ("This stunning home...")
- Lead with the design idea or site response, not the brief
- Materials, form, spatial logic over adjectives

---

## Updating the /process page

The process page tells the story of how a project moves through phases. Currently shows 7 phases for "modern-dwelling" using placeholder SVGs.

### Swap placeholder SVGs for real images

Drop real images (any format/size) into a staging folder, run the optimiser pointing output at the process folder, then make sure filenames match what `processPhases.ts` references.

```bash
cd ~/code/ben-speedy-index

# Optimise into the process folder
node scripts/optimise-images.js ~/Desktop/process-images/ --out public/process/

# Confirm filenames match what processPhases.ts expects
grep "modern-dwelling/" src/data/processPhases.ts
ls public/process/modern-dwelling/
```

If the optimiser names files `01.jpg`, `02.jpg`, ... but the data file expects `interior-living.jpg`, `exterior-front.jpg` etc., either rename the source files before optimising (e.g. `interior-living.jpg` in source folder) or update `processPhases.ts` paths to match.

If swapping `.svg` placeholders for `.jpg` photos, also update extensions:
```bash
sed -i '' 's|/process/modern-dwelling/\([a-z0-9-]*\)\.svg|/process/modern-dwelling/\1.jpg|g' src/data/processPhases.ts
sed -i '' 's|/process/modern-dwelling/floor-plan-1\.svg|/process/modern-dwelling/floor-plan-1.jpg|g; s|/process/modern-dwelling/floor-plan-2\.svg|/process/modern-dwelling/floor-plan-2.jpg|g' src/app/process/ProcessClient.tsx
```

### Edit phase content

`src/data/processPhases.ts` has 7 phase objects. Each has a `body` tuple of paragraphs, a `detail` block, an `image` path, and `caption`. Edit text directly. Keep the architectural tone consistent with elsewhere on the site.

---

## Updating the /history page (CV)

Full CV lives in `src/app/history/page.tsx` as a server component. Edit the JSX directly. Sections: education, professional experience, registrations, awards, exhibitions, publications. Format follows a year-left, content-right grid.

---

## Image preparation rules

Mostly handled by the optimiser. For source images:
- Hero: landscape orientation works best for the helix card
- Source can be any size or format (HEIC, PNG, JPEG, etc.)
- Gallery order matters, sequence the visual narrative deliberately, prefix files with `01_`, `02_` if naming doesn't sort right naturally

## Optimiser script reference

Location: `scripts/optimise-images.js`. Requires `sharp` (already installed as devDependency).

Flags:
- `--dry-run` — preview what would be written, no files touched
- `--out <dir>` — write to a different output directory (default: `./public/projects`)

If a single image won't compress under 400KB at q60, it's written anyway with a "(over target, quality floor reached)" flag in the output. Resize the source down further if needed.

## Helix defaults (current)

Defined in `src/components/HelixPortfolio.tsx` line 11:

```typescript
const TWEAK_DEFAULTS = {
  helixRadius: 440,
  ringSpacing: 280,
  autoRotateSpeed: 13,
  velocityDamping: 0.0001,
  focusDistance: 240,
  zoom: 0.6,
  centerX: 0,
  centerY: 0,
};
```

To change defaults: edit the object, save, commit, push. Or use the live tweaks panel on the site to dial in new values, then update the constants to match.

## Common gotchas

- `code` CLI shortcut isn't installed, use `open <file>` instead
- **Project moved off `~/Desktop/` to `~/code/`**. Don't ever put it back inside the iCloud-synced Desktop folder. iCloud creates "filename 2.tsx" duplicates and silently deletes folders mid-edit. If old chat history says `~/Desktop/PORTFOLIO/...`, that's stale.
- Stop the dev server (`Ctrl+C`) before running git commands
- The `id` (slug) must match the folder name in `/public/projects/` exactly
- Renumbering helix projects cascades, every project below the insertion point needs its `number` field updated
- Folder names in source must be kebab-case (no spaces, no capitals) before running the optimiser
- Bracketed paste mode in zsh can swallow multi-line commands, paste blocks of commands one chunk at a time if commands appear with `^[[200~` or similar prefixes
- CSS Modules (`*.module.css`) reject pure global selectors like `*` or bare type selectors. Move site-wide rules to `globals.css` and keep module files class-scoped only.
- The TopBar in `HelixPortfolio.tsx` AND the SiteChrome bar must both be `position: fixed` so the bar doesn't visibly jump when navigating between Work/Process/History.

## Quick reference for "where does each thing live"

| What | Where |
|---|---|
| Helix project metadata | `src/data/projects.ts` |
| Helix project images | `public/projects/<slug>/` |
| Process page phases | `src/data/processPhases.ts` |
| Process page images | `public/process/<project-slug>/` |
| Process page UI | `src/app/process/ProcessClient.tsx` |
| History/CV page | `src/app/history/page.tsx` |
| Helix component + defaults | `src/components/HelixPortfolio.tsx` |
| Shared top/bottom bar (process, history) | `src/components/SiteChrome.tsx` |
| Site styles, CSS vars, fonts | `src/app/globals.css` |
| Image optimiser | `scripts/optimise-images.js` |
| Deploy | Auto on push to `main` |
