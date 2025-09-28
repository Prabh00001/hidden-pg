// src/types.ts
// ---------------------------------------------------------------------------
// Hidden PG — Flexible, back-compatible types
// - Keeps older keys (name/desc) alongside new ones (title/description)
// - Adds brand/logo + photo credit support used by GemCard & GemModal
// - Permissive Category type; optional fields to avoid TS breakage
// - Index signature so unknown fields in gems.ts never error
// ---------------------------------------------------------------------------

/* --------------------------------- Category -------------------------------- */
export type Category =
  | "Food"
  | "Cafe"
  | "Restaurant"
  | "Bakery"
  | "Bar"
  | "Shop"
  | "Attraction"
  | "Trail"
  | "Park"
  | "Event"
  | "Other"
  | (string & {}); // allow any custom category strings without losing literal types

/* ------------------------------- Photo Credit ------------------------------ */
export type PhotoCredit = {
  name: string;     // e.g., "Deb’s Café & Specialty Bakery"
  url?: string;     // optional: link to IG/FB/site
};

/* ----------------------------------- Brand --------------------------------- */
export type Brand = {
  name: string;     // business name for accessibility
  logo?: string;    // /images/logos/xxx.svg|png
  logoAlt?: string; // accessible alt, defaults to `${name} logo` if omitted
};

/* ------------------------------------ Gem ---------------------------------- */
export interface Gem {
  // Required
  id: string;

  // Naming (support both new & legacy)
  title?: string;          // preferred
  name?: string;           // legacy

  // Description (support both new & legacy)
  description?: string;    // preferred
  desc?: string;           // legacy

  // Categorization
  category?: Category;
  tags?: string[];

  // Routing
  slug?: string;

  // Media
  image?: string;          // cover (card hero)
  images?: string[];       // gallery (modal)
  brand?: Brand;           // NEW (logo chip on card + modal header)
  photoCredit?: PhotoCredit; // NEW (inline credit in modal details)

  // Business info / CTAs
  website?: string;
  phone?: string;
  mapsUrl?: string;
  instagram?: string;
  facebook?: string;
  address?: string;

  // Commercial flags
  sponsored?: boolean;

  // Optional meta
  createdAt?: string;      // ISO date strings if you ever set them
  updatedAt?: string;

  // Safety net: allow extra fields in gems.ts without TS errors
  [key: string]: unknown;
}

/* --------------------------------- Helpers --------------------------------- */
export type GemList = Gem[];

/* ------------------------------- UI/Content -------------------------------- */
export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface SpotlightItem {
  id: string;
  title: string;
  img: string;
  blurb: string;
  href?: string;
  tag?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  img: string;
  excerpt: string;
  date: string;      // "YYYY-MM-DD"
  content?: string;  // optional full story
  slug?: string;     // pretty URL
  tags?: string[];   // chips for UI/SEO
}

// Back-compat for the Featured section cards
export interface FeaturedItem {
  id: string;
  name: string;   // display title on the feature card
  img: string;    // image shown on the feature card
  blurb: string;  // short description
  href?: string;  // optional link (if your featured.ts uses it)
  tag?: string;   // optional label/chip
}
