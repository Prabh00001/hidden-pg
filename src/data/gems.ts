// src/data/gems.ts
import { Gem, Category } from "../types";

/** Legacy-friendly shape — lets you keep existing keys like name/desc/img */
type LegacyGem = {
  id: string;
  category: string; // we'll normalize but accept any string

  // legacy names
  name?: string;
  desc?: string;
  img?: string;

  // canonical names
  title?: string;
  description?: string;
  image?: string;

  // optional fields used across the app
  slug?: string;
  tags?: string[];
  images?: string[];
  address?: string;
  mapsUrl?: string;
  website?: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  sponsored?: boolean;
  featured?: boolean;
  photoCredit?: { name: string; url?: string };

  // allow misc keys without breaking
  [key: string]: unknown;
};

/** 🔧 Normalize plural/aliases without breaking your existing filters */
function normalizeCategory(cat: string): Category {
  const c = (cat || "").trim();
  switch (c.toLowerCase()) {
    case "parks":
      return "Park";
    case "restaurants":
      return "Restaurant";
    default:
      // Category in your types allows any string label, so just return as-is
      return c as Category;
  }
}

/** 🔁 Convert any legacy item into a strict Gem — without duplicate key spreads */
function normalizeGem(src: LegacyGem): Gem {
  // Strip keys that we explicitly set so the later spread can't overwrite them.
  const {
    id,
    category,
    name,
    title,
    desc,
    description,
    img,
    image,
    tags,
    ...rest
  } = src;

  const finalTitle = title ?? name ?? "";
  const finalDesc = description ?? desc ?? "";
  const finalImage = image ?? img ?? "";

  const gem: Gem = {
    // required core
    id,
    category: normalizeCategory(category),
    title: finalTitle,
    description: finalDesc,
    image: finalImage,

    // optional / pass-through that we didn't explicitly set above
    tags: tags ?? [],
    ...rest, // safe now — no id/category/title/description/image inside
  };

  return gem;
}

/** ⬇️ REPLACE the example items below with your existing items (paste them as-is). */
const RAW_GEMS: LegacyGem[] = [
  // Example legacy item (you can delete these)
  {
  id: "open-door-cafe",
  title: "The Open Door Cafe",
  category: "Cafe",
  image: "/images/gems/open-door-cafe/cover-1200w.webp",
  images: [
    "/images/gems/open-door-cafe/1-1600w.webp",
    "/images/gems/open-door-cafe/2-1600w.webp",
    "/images/gems/open-door-cafe/3-650w.webp",
  "/images/gems/open-door-cafe/4-750w.webp",
  ],
  brand: {
  name: "The Open Door Cafe",
  logo: "/images/logos/open-door-cafe.svg",
  logoAlt: "The Open Door Cafe logo",
},
  description:
    "The Open Door Cafe strives to create a space that fosters community, creativity and connection. They are passionate about supporting local businesses, and source their wares from over 40 of them! Complete with fresh baked goodies, grab-and-go breakfast and lunch items, and a full menu of specialty coffee/ tea options! Visit them in their drive thru, or take it slow in their cozy upstairs loft.",
  website: "https://www.theopendoorcafe.ca/?utm_source=hiddenpg&utm_medium=card&utm_campaign=gem_profile",
  instagram: "https://www.instagram.com/theopendoorcafe.pg",
  facebook: "https://www.facebook.com/theopendoorcafe.pg",
  // Optional: add when/if you have them
  phone: "+1 (250) 961-2462",
  mapsUrl: "https://maps.app.goo.gl/vYw5dtcU5QXZtGZ96",
  tags: [
    "local-specialty-coffee",
    "fresh-baked",
    "breakfast",
    "lunch",
    "community",
    "cozy-loft",
    "support-local"
  ],
  photoCredit: { name: "Rachael Bethany Photography" },
  featured: true
},
{
  id: "debs-cafe",
  title: "Deb’s Café & Specialty Bakery",
  category: "Bakery • Café",
  description:
    "Homestyle baking, hearty breakfasts, and friendly vibes. A cozy Prince George staple for sweet treats and comfort food.",
  image: "/images/gems/debs-cafe/cover-1200w.webp",
  images: [
    "/images/gems/debs-cafe/1-800w.webp",
    "/images/gems/debs-cafe/2-1200w.webp",
    "/images/gems/debs-cafe/3-1200w.webp",
  ],
  brand: {
    name: "Deb’s Café & Specialty Bakery",
    logo: "/images/logos/debs-cafe.svg",
    logoAlt: "Deb’s Café & Specialty Bakery logo",
  },
  photoCredit: {
    name: "Deb’s Café & Specialty Bakery",
    // url: "https://www.instagram.com/....", // optional if crediting a specific source
  },
  website: "https://debscafe.ca/",       // add if you have it
  phone: "+1 (250) 565-1115",         // add if you have it
  mapsUrl: "https://maps.google.com/?q=Deb’s Café & Specialty Bakery Prince George",
  instagram: "https://www.instagram.com/debs.cafeandbakery/",     // add if you have it
  facebook: "https://www.facebook.com/DebscafePrinceGeorge",      // add if you have it
  tags: ["bakery", "breakfast", "pastries", "coffee", "local", "PG"],
},
  {
  id: "cottonwood-island-park",
  slug: "cottonwood-island-park",
  title: "Cottonwood Island Park",
  name: "Cottonwood Island Park", // legacy key (safe)
  category: "Park",
  // Cover (use JPG for now if you haven't converted yet; swap to WebP later)
  image: "/images/gems/cottonwood-island-park/cover-1200w.webp",
  // Optional gallery (add when ready)
  images: [
    "/images/gems/cottonwood-island-park/1-1600w.webp",
    "/images/gems/cottonwood-island-park/2-1600w.webp",
    "/images/gems/cottonwood-island-park/3-1600w.webp",
  ],
  description: "Riverside nature park along the Nechako with multi-use trails, viewing platforms and the famous cottonwood tree-bark carvings. Easy family walks year-round; launch points for paddling in summer and XC-skiable paths in winter.",
  desc: "Leafy riverside paths and wooden bridge carvings.", // legacy text (safe)
  tags: ["nature", "fraser-river", "family", "trail"],
  mapsUrl: "https://maps.google.com/?q=Cottonwood+Island+Park+Prince+George",
  // Add these later if you have them:
  // website: "",
  // instagram: "",
  // facebook: "",
  photoCredit: { name: "Photos by Hidden PG" },
},
{
  id: "queen-of-harts",
  slug: "queen-of-harts",
  title: "Queen of Harts",
  name: "Queen of Harts",
  category: "Restaurant",
  image: "/images/gems/queen-of-harts/cover-650w.webp",
  images: [
     "/images/gems/queen-of-harts/1-650w.webp",
     "/images/gems/queen-of-harts/2-500w.webp",
     "/images/gems/queen-of-harts/3-650w.webp",
  ],
  description:
    "Neighbourhood spot on Hart Highway serving hearty breakfasts, burgers and comfort plates in a friendly, family-run setting. Popular for morning plates and all-day diner classics; call ahead—tables fill up fast.",
  desc:
    "Hart Highway favourite for hearty breakfasts, burgers and comfort plates.",
  tags: ["breakfast", "comfort-food", "hart-highway", "family"],
  website: "https://queenofharts.ca/",
  phone: "+1-250-645-8147",
  mapsUrl: "https://maps.google.com/?q=Queen%20of%20Harts%206545%20Hart%20Highway%20Prince%20George",
  instagram: "https://www.instagram.com/queenofhartsrestaurant/",
  facebook: "https://www.facebook.com/QoHarts/",
  photoCredit: {
    name: "Queen of Harts (Instagram)",
    url: "https://www.instagram.com/queenofhartsrestaurant/"
  }
  // Sources: official site lists address/hours; social posts note busy times and reservations by phone. 
  // (Refs: queenofharts.ca + IG/FB pages)
},
{
  id: "golden-bento",
  slug: "golden-bento",
  title: "Golden Bento",
  name: "Golden Bento",
  category: "Food", // keep as 'Food' to match your current filter set
  image: "/images/gems/golden-bento/cover-1200w.webp",
  images: [
    // "/images/gems/golden-bento/1-1600w.webp",
    // "/images/gems/golden-bento/2-1600w.webp",
    // "/images/gems/golden-bento/3-650w.webp",
  ],
  description: "Local favourite for generous Chinese/Japanese-inspired combos—think chow mein, ginger beef, sweet-and-sour pork, fried rice and prawn specials—available for dine-in or quick takeout downtown.",
  desc: "Cozy Japanese bentos and house sauces.",
  tags: ["japanese", "bento", "downtown"],
  // If you have a site, add it clean; our modal appends UTM automatically:
  // website: "https://goldenbento.example.com",
  photoCredit: { name: "Golden Bento" },
  mapsUrl: "https://maps.google.com/?q=Golden+Bento+Prince+George",
  // Optional brand/logo (add later if they share an official logo)
  // brand: {
  //   name: "Golden Bento",
  //   logo: "/images/logos/golden-bento.svg",
  //   logoAlt: "Golden Bento logo",
  // },
},


  // 👉 PASTE ALL YOUR CURRENT ITEMS HERE (exactly as they are now).
];

/** Final, strict array used by the app */
export const GEMS: Gem[] = RAW_GEMS.map(normalizeGem);
