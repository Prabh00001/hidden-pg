// src/utils/suggestions.ts
import { GEMS } from "../data/gems";
import { Gem } from "../types";

/** What SearchBar consumes.
 *  We include both canonical + legacy keys to avoid breaking older code.
 */
export type Suggestion = {
  id: string;
  title: string;          // canonical
  name?: string;          // legacy alias (SearchBar already falls back)
  image?: string;         // canonical
  img?: string;           // legacy alias (SearchBar already falls back)
  category: string;
  tags?: string[];
  description?: string;   // canonical
  desc?: string;          // legacy alias
};

/** Normalize helpers (safe fallbacks) */
function getTitle(g: Gem): string {
  return (g.title ?? g.name ?? "").trim();
}
function getDesc(g: Gem): string {
  return (g.description ?? g.desc ?? "").trim();
}
function getImage(g: Gem): string | undefined {
  return (g.image ?? (g as any)?.img) as string | undefined;
}
function getTags(g: Gem): string[] {
  return Array.isArray(g.tags) ? g.tags : [];
}

/** Score a gem for a query (higher is better). */
function scoreGem(g: Gem, q: string): number {
  if (!q) return 0;
  const title = getTitle(g).toLowerCase();
  const desc = getDesc(g).toLowerCase();
  const tags = getTags(g).map((t) => t.toLowerCase());

  let score = 0;
  if (title.includes(q)) score += 3;
  if (tags.some((t) => t.includes(q))) score += 2;
  if (desc.includes(q)) score += 1;
  return score;
}

/** Public API: getSuggestions
 *  - Safe with empty queries (returns a small, stable set)
 *  - Prioritizes title > tags > description matches
 *  - Returns objects with both canonical and legacy keys so UI never breaks
 */
export function getSuggestions(query: string, limit = 8): Suggestion[] {
  const q = (query || "").trim().toLowerCase();

  // If no query, return a small, predictable slice (e.g., featured first)
  if (!q) {
    return GEMS.slice(0, limit).map(toSuggestion);
  }

  // Score, sort, slice
  const scored = GEMS
    .map((g) => ({ g, s: scoreGem(g, q) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ g }) => toSuggestion(g));

  return scored;
}

/** Convert a Gem to a Suggestion (keeps legacy aliases populated). */
function toSuggestion(g: Gem): Suggestion {
  const title = getTitle(g);
  const desc = getDesc(g);
  const image = getImage(g);
  const tags = getTags(g);

  return {
    id: g.id,
    title,
    name: g.name,           // legacy (ok if undefined)
    image,                  // canonical
    img: (g as any)?.img,   // legacy (ok if undefined)
    category: g.category,
    tags,
    description: desc || undefined,
    desc: g.desc,           // legacy (ok if undefined)
  };
}

export default getSuggestions;
