import React from "react";
import { Gem } from "../types";
import GemCard from "./GemCard";

/* ----------------------- Category helpers (inline) ----------------------- */
const normalize = (s: string) =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

const splitMulti = (s: string) =>
  s.split(/[•,/|]/).map((p) => p.trim()).filter(Boolean);

const hasCategory = (gem: Gem, wantedRaw: string) => {
  if (!wantedRaw) return true;
  const wanted = normalize(wantedRaw);

  if (gem.category) {
    for (const part of splitMulti(gem.category)) {
      if (normalize(part) === wanted) return true;
    }
    if (normalize(gem.category).includes(wanted)) return true;
  }

  if (Array.isArray(gem.tags)) {
    if (gem.tags.some((t) => normalize(t) === wanted)) return true;
  }

  return false;
};

/* --------------------------------- Grid ---------------------------------- */
export default function GemGrid({
  items,
  filterCategory,
}: {
  items: Gem[];
  filterCategory?: string;
}) {
  const visible = React.useMemo(
    () =>
      filterCategory && filterCategory.trim()
        ? items.filter((g) => hasCategory(g, filterCategory))
        : items,
    [items, filterCategory]
  );

  if (!visible.length) {
    return (
      <div className="py-10 text-center text-sm text-slate-500">
        No gems match this filter.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
      {visible.map((g) => (
        <GemCard key={g.id} gem={g} />
      ))}
    </div>
  );
}
