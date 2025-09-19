// src/components/Filters.tsx
import React, { useMemo, useState } from "react";
import { Category } from "../types";

type Cat = Category | "All";

export default function Filters({
  category,
  setCategory,
  total,
}: {
  category: Cat;
  setCategory: (c: Cat) => void;
  total: number;
}) {
  // ✳️ full list (adjust if your enum differs)
  const ALL: Category[] = useMemo(
    () =>
      ([
        "Museums",
        "Nature",
        "Food",
        "Parks",
        "Trails",
        "Art",
        "Shopping",
        "Events",
        "Cafes",
        "Other",
      ] as unknown as Category[]),
    []
  );

  // ✳️ show just Food & Trails next to All on mobile
  const PRIMARY_ON_MOBILE: Category[] = useMemo(
    () => (["Food", "Trails"] as unknown as Category[]),
    []
  );

  const secondary = useMemo(
    () => ALL.filter((c) => !PRIMARY_ON_MOBILE.includes(c)),
    [ALL, PRIMARY_ON_MOBILE]
  );

  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6">
      {/* Desktop/tablet — full row */}
      <div className="hidden md:flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {renderAllChip({ active: category === "All", onClick: () => setCategory("All") })}
          {ALL.map((c) => (
            <Chip
              key={String(c)}
              label={String(c)}
              active={category === c}
              onClick={() => setCategory(c)}
            />
          ))}
        </div>
        <span className="text-sm text-slate-500 whitespace-nowrap">{total} results</span>
      </div>

      {/* Mobile — All, Food, Trails, More+ */}
      <div className="md:hidden flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {renderAllChip({ active: category === "All", onClick: () => setCategory("All") })}

          {PRIMARY_ON_MOBILE.map((c) => (
            <Chip
              key={String(c)}
              label={String(c)}
              active={category === c}
              onClick={() => setCategory(c)}
            />
          ))}

          {/* More+ is a trigger, not a filter */}
          <MoreChip onClick={() => setOpen(true)} />
        </div>
        <span className="text-sm text-slate-500 whitespace-nowrap">{total} results</span>
      </div>

      {/* Mobile bottom-sheet with the rest */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white p-4 shadow-2xl max-h-[70vh] overflow-y-auto">
            <div className="mx-auto h-1 w-12 rounded-full bg-slate-200 mb-3" />
            <h3 className="text-base font-semibold text-slate-900">More categories</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {secondary.map((c) => (
                <Chip
                  key={String(c)}
                  label={String(c)}
                  active={category === c}
                  onClick={() => {
                    setCategory(c);
                    setOpen(false);
                  }}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-emerald-600 text-white px-4 py-2 text-sm font-semibold shadow hover:bg-emerald-700 active:scale-[.98]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* === tiny presentational helpers === */

// “All” chip has a subtly different (filled) style so it stands apart
function renderAllChip({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium shadow-sm transition",
        active
          ? "bg-slate-800 text-white"
          : "bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200",
      ].join(" ")}
    >
      All
    </button>
  );
}

// Normal category chip (outline style unless active)
function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition",
        active
          ? "bg-emerald-600 text-white shadow-sm"
          : "bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

// “More+” chip uses a filled neutral look so it’s distinct from Food/Trails
function MoreChip({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className="inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-semibold bg-slate-100 text-slate-800 border border-slate-300 shadow-sm hover:bg-slate-200 active:scale-[.98]"
    >
      More+
    </button>
  );
}
