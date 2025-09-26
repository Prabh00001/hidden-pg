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
  ],
  description:
    "The Open Door Cafe strives to create a space that fosters community, creativity and connection. They are passionate about supporting local businesses, and source their wares from over 40 of them! Complete with fresh baked goodies, grab-and-go breakfast and lunch items, and a full menu of specialty coffee/ tea options! Visit them in their drive thru, or take it slow in their cozy upstairs loft.",
  website: "https://www.theopendoorcafe.ca/?utm_source=hiddenpg&utm_medium=card&utm_campaign=gem_profile",
  instagram: "https://www.instagram.com/theopendoorcafe.pg",
  facebook: "https://www.facebook.com/theopendoorcafe.pg",
  // Optional: add when/if you have them
  // phone: "+1 250-XXX-XXXX",
  // mapsUrl: "https://goo.gl/maps/......",
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
    id: "park-1",
    name: "Cottonwood Island Park",
    category: "Parks",
    img: "/images/gems/cottonwood/cover.jpg",
    desc: "Leafy riverside paths and wooden bridge carvings.",
    tags: ["nature", "fraser-river", "family"],
  },
  {
    id: "food-1",
    title: "Golden Bento",
    category: "Food",
    image: "/images/gems/golden-bento/cover.jpg",
    description: "Cozy Japanese bentos and house sauces.",
    tags: ["japanese", "bento", "downtown"],
    website:
      "https://goldenbento.example.com?utm_source=hiddenpg&utm_medium=card&utm_campaign=gem_profile",
    photoCredit: { name: "Golden Bento" },
  },

  // 👉 PASTE ALL YOUR CURRENT ITEMS HERE (exactly as they are now).
];

/** Final, strict array used by the app */
export const GEMS: Gem[] = RAW_GEMS.map(normalizeGem);
