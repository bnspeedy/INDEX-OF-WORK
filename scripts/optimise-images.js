#!/usr/bin/env node
/**
 * Batch image optimiser for studioben.co portfolio.
 *
 * Usage:
 *   node scripts/optimise-images.js <source-folder> [--out <dir>] [--dry-run]
 *
 * Examples:
 *   node scripts/optimise-images.js ~/Desktop/new-projects/
 *   node scripts/optimise-images.js ~/Desktop/new-projects/ --out ./public/projects
 *   node scripts/optimise-images.js ~/Desktop/new-projects/ --dry-run
 *
 * Expects this structure:
 *   <source>/
 *     <slug>/
 *       hero.<ext>        ← any image with "hero" in the basename
 *       01_*.jpg, 02.png, IMG_4521.heic, anything.jpeg
 *
 * Outputs to ./public/projects/<slug>/ by default:
 *     hero.jpg, 01.jpg, 02.jpg, ...
 *
 * Spec per image:
 *   - JPEG, quality 82, sRGB, EXIF stripped, progressive
 *   - Max long edge 2400px (no upscaling)
 *   - Iteratively re-compresses if file > 400KB (down to q60 floor)
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

let sharp;
try {
  sharp = require("sharp");
} catch (e) {
  console.error("\n  Missing dependency: sharp");
  console.error("  Install it from the repo root:");
  console.error("    npm install --save-dev sharp\n");
  process.exit(1);
}

// ─── Config ──────────────────────────────────────────────────────────────────
const MAX_LONG_EDGE = 2400;
const TARGET_KB = 400;
const QUALITY_START = 82;
const QUALITY_FLOOR = 60;
const QUALITY_STEP = 6;

const VALID_EXTS = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".tif", ".tiff",
]);

// ─── CLI ─────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log(`
  Usage: node scripts/optimise-images.js <source-folder> [--out <dir>] [--dry-run]

  Source folder should contain one subfolder per project (folder name = slug).
  Each subfolder needs one "hero" image and any number of gallery images.
  Gallery order: numeric prefix (01_*, 02_*) wins, otherwise alphabetical.
`);
  process.exit(0);
}

const sourceArg = args[0];
const outIdx = args.indexOf("--out");
const outDir = outIdx !== -1 ? args[outIdx + 1] : "./public/projects";
const dryRun = args.includes("--dry-run");

const sourceRoot = expandHome(sourceArg);
const outRoot = path.resolve(expandHome(outDir));

if (!fs.existsSync(sourceRoot) || !fs.statSync(sourceRoot).isDirectory()) {
  console.error(`  Source folder not found: ${sourceRoot}`);
  process.exit(1);
}

// ─── Run ─────────────────────────────────────────────────────────────────────
(async () => {
  console.log(`\n  Source: ${sourceRoot}`);
  console.log(`  Output: ${outRoot}`);
  if (dryRun) console.log(`  Mode:   DRY RUN (no files written)\n`);
  else console.log("");

  const slugs = fs
    .readdirSync(sourceRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("."))
    .map((d) => d.name);

  if (slugs.length === 0) {
    console.error("  No project subfolders found.");
    process.exit(1);
  }

  for (const slug of slugs) {
    await processProject(slug);
  }

  console.log("\n  Done.\n");
})().catch((err) => {
  console.error("\n  Failed:", err.message);
  process.exit(1);
});

// ─── Per-project ─────────────────────────────────────────────────────────────
async function processProject(slug) {
  const srcDir = path.join(sourceRoot, slug);
  const dstDir = path.join(outRoot, slug);

  console.log(`  [${slug}]`);

  const files = fs
    .readdirSync(srcDir)
    .filter((f) => VALID_EXTS.has(path.extname(f).toLowerCase()))
    .filter((f) => !f.startsWith("."));

  const heroes = files.filter((f) => /hero/i.test(path.parse(f).name));
  if (heroes.length === 0) {
    console.log(`     skip: no hero image found (need a file with "hero" in name)\n`);
    return;
  }
  if (heroes.length > 1) {
    console.log(`     warn: multiple hero candidates, using ${heroes[0]}`);
  }

  const heroFile = heroes[0];
  const galleryFiles = files
    .filter((f) => f !== heroFile)
    .sort(naturalSort);

  if (!dryRun) fs.mkdirSync(dstDir, { recursive: true });

  // Hero
  await optimise(path.join(srcDir, heroFile), path.join(dstDir, "hero.jpg"));

  // Gallery: 01.jpg, 02.jpg, ...
  for (let i = 0; i < galleryFiles.length; i++) {
    const num = String(i + 1).padStart(2, "0");
    await optimise(path.join(srcDir, galleryFiles[i]), path.join(dstDir, `${num}.jpg`));
  }

  console.log("");
}

// ─── Image optimiser ─────────────────────────────────────────────────────────
async function optimise(srcPath, dstPath) {
  const label = `${path.basename(path.dirname(dstPath))}/${path.basename(dstPath)}`;
  const srcName = path.basename(srcPath);

  if (dryRun) {
    console.log(`     would write ${label}  ← ${srcName}`);
    return;
  }

  let quality = QUALITY_START;
  let buffer;
  let attempt = 0;

  while (true) {
    attempt++;
    buffer = await sharp(srcPath, { failOn: "none" })
      .rotate() // honour EXIF orientation, then strip
      .resize({
        width: MAX_LONG_EDGE,
        height: MAX_LONG_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .toColorspace("srgb")
      .jpeg({
        quality,
        progressive: true,
        mozjpeg: true,
        chromaSubsampling: "4:2:0",
      })
      .withMetadata({}) // strip EXIF
      .toBuffer();

    const kb = buffer.length / 1024;
    if (kb <= TARGET_KB || quality <= QUALITY_FLOOR) {
      fs.writeFileSync(dstPath, buffer);
      const flag = kb > TARGET_KB ? " (over target, quality floor reached)" : "";
      console.log(
        `     ${label.padEnd(36)} ${kb.toFixed(0).padStart(4)}KB  q${quality}  ${srcName}${flag}`
      );
      return;
    }
    quality -= QUALITY_STEP;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function expandHome(p) {
  if (!p) return p;
  if (p === "~") return os.homedir();
  if (p.startsWith("~/")) return path.join(os.homedir(), p.slice(2));
  return path.resolve(p);
}

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}
