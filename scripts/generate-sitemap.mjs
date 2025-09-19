// scripts/generate-sitemap.mjs
import { writeFileSync } from "fs";

const BASE = "https://hiddenprincegeorge.ca"; // <- your domain

// Only list real, indexable routes (no #, no query params, no admin)
const routes = [
  "/", "gems", "featured", "newsletter", "feature-your-business",
  "events", "blog", "contact", "privacy", "about"
];

const freq = {
  "/": "weekly",
  gems: "weekly",
  featured: "weekly",
  newsletter: "monthly",
  "feature-your-business": "monthly",
  events: "weekly",
  blog: "weekly",
  contact: "yearly",
  privacy: "yearly",
  about: "yearly"
};

const priority = {
  "/": 1.0,
  gems: 0.9,
  featured: 0.8,
  newsletter: 0.5,
  "feature-your-business": 0.6,
  events: 0.7,
  blog: 0.7,
  contact: 0.3,
  privacy: 0.2,
  about: 0.2
};

const urls = routes.map(p => {
  const loc = p === "/" ? `${BASE}/` : `${BASE}/${p}`;
  return `  <url><loc>${loc}</loc><changefreq>${freq[p]}</changefreq><priority>${priority[p]}</priority></url>`;
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml);
console.log("✅ Wrote public/sitemap.xml");
