// src/types.ts
// ---------------------------------------------------------------------------
// Flexible, back-compatible types for Hidden PG
// - Allows old data keys (name/desc/tags) while we migrate to title/description
// - Permissive Category type so filters keep working
// - Index signature to avoid "Object literal may only specify known properties"
//   errors coming from gems.ts while we standardize fields.
// ---------------------------------------------------------------------------

export type Category =
  | "Food"
  | "Cafe"
  | "Restaurant"
  | "Attraction"
  | "Trail"
  | "Park"
  | "Shop"
  | "Activity"
  | "Event"
  | "Service"
  | "Other"
  // allow any other string labels used today:
  | (string & {});

export interface PhotoCredit {
  name: string;
  url?: string;
}

export interface Gem {
  // Core
  id: string;
  category: Category;
  image: string;

  // Canonical fields (preferred going forward)
  title: string;
  description: string;

  // Optional enrichments
  slug?: string;
  images?: string[];
  address?: string;
  mapsUrl?: string;
  website?: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  sponsored?: boolean;
  featured?: boolean;
  photoCredit?: PhotoCredit;

  // -------------------------------------------------------------------------
  // Back-compat aliases (keeps older code/data compiling):
  // -------------------------------------------------------------------------
  /** @deprecated Use `title` */
  name?: string;
  /** @deprecated Use `description` */
  desc?: string;
  /** Optional label metadata used by filters/search */
  tags?: string[];

  // -------------------------------------------------------------------------
  // Safety valve: if some items in gems.ts currently include extra keys,
  // we won't blow up the build. We'll tighten this later once all data is clean.
  // -------------------------------------------------------------------------
  [key: string]: unknown;
}


export interface FeaturedItem {
  id: string;
  name: string;
  img: string;
  blurb: string;
}

export interface BlogPost {
  id: string;
  title: string;
  img: string;
  excerpt: string;
  date: string;      // e.g. "2025-08-01"
  content?: string;  // full story (optional)
  slug?: string;     // optional pretty URL
  tags?: string[];   // optional tag chips for UI/SEO
}
