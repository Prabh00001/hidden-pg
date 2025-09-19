import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const SITE = "https://hiddenprincegeorge.ca";
const now = new Date().toISOString();

// Add/extend this list as you publish pages or import from your routes/data
const routes = [
  "/", 
  "/hidden-gems-prince-george",
  "/events",
  "/about",
  "/contact"
];

const urlset = routes.map(p => `
  <url>
    <loc>${SITE}${p}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`).join("");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;

const outDir = resolve(process.cwd(), "public");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "sitemap.xml"), xml, "utf8");
console.log("[sitemap] wrote public/sitemap.xml with lastmod for", routes.length, "URLs");
