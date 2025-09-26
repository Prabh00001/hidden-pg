// scripts/compress-gems.mjs
import fg from "fast-glob";
import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";

/** ------- Config ------- */
const GEMS_DIR = "public/images/gems";
const FOLDERS = [
  "open-door-cafe",
  // add more gems here as you go
];
const SIZES = [1600, 1200];   // keep it lean; add 800 if you later use <picture/srcset>
const WEBP_QUALITY = 72;
/** ---------------------- */

const WIDTH_SUFFIX_RE = /-(800|1200|1600)w\.(webp|jpe?g|png)$/i;

async function ensureDir(p) { await fs.mkdir(p, { recursive: true }); }
function outName(base, w, ext) { const { name } = path.parse(base); return `${name}-${w}w.${ext}`; }

async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }

async function processImage(srcPath, outDir) {
  const base = path.basename(srcPath);

  // Skip files that already look like resized assets (defensive)
  if (WIDTH_SUFFIX_RE.test(base)) return;

  const src = sharp(srcPath).rotate(); // auto-orient
  const meta = await src.metadata();
  const width = meta.width || 2000;

  for (const w of SIZES) {
    if (w > width) continue; // don't upscale

    const webpOut = path.join(outDir, outName(base, w, "webp"));
    if (await exists(webpOut)) continue; // prevent re-writing if already generated

    await src
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpOut);
    console.log("   ✓", path.basename(webpOut));
  }
}

async function run() {
  for (const folder of FOLDERS) {
    const inDir = path.join(GEMS_DIR, folder, "source");
    const outDir = path.join(GEMS_DIR, folder);
    await ensureDir(outDir);

    const files = await fg(["**/*.{jpg,jpeg,png,webp}"], { cwd: inDir, absolute: true });
    if (!files.length) {
      console.log(`(skip) No originals found in ${inDir}`);
      continue;
    }

    console.log(`→ ${folder}: ${files.length} original(s)`);
    for (const f of files) { await processImage(f, outDir); }
  }
  console.log("Done.");
}

run().catch((e) => { console.error(e); process.exit(1); });
