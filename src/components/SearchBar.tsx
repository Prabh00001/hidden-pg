// src/components/SearchBar.tsx
import React, { useState, useRef, useEffect, useMemo } from "react";
import { GEMS } from "../data/gems";
import type { Gem } from "../types";
import { getSuggestions } from "../utils/suggestions";

interface Props {
  query: string;
  setQuery: (v: string) => void;
  showLogo?: boolean;
  logoSrc?: string;
  logoAlt?: string;
  placeholder?: string;
  onSubmit?: (value: string) => void;
  className?: string;
}

export default function SearchBar({
  query,
  setQuery,
  showLogo = false,
  logoSrc = "/logo/hpg-badge.png",
  logoAlt = "Hidden PG",
  placeholder = "Search gems, tags, places…",
  onSubmit,
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const suggestions: Gem[] = useMemo(() => getSuggestions(query, GEMS, 6), [query]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      const el = e.target as Node;
      if (el && !inputRef.current?.parentElement?.contains(el) && !listRef.current?.contains(el)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    setOpen(v.trim().length > 0);
    setSelected(-1);
  };

  const chooseSuggestion = (s: Gem) => {
    setQuery(s.name);
    setOpen(false);
    inputRef.current?.focus();
    onSubmit?.(s.name);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (open && suggestions.length > 0) {
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, suggestions.length - 1)); return; }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); return; }
      if (e.key === "Enter")     {
        e.preventDefault();
        if (selected >= 0 && suggestions[selected]) { chooseSuggestion(suggestions[selected]); }
        else { setOpen(false); onSubmit?.(query); }
        return;
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      onSubmit?.(query);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {showLogo && (
        <img
          src={logoSrc}
          alt={logoAlt}
          className="mx-auto mb-3 h-16 w-16 md:h-20 md:w-20 drop-shadow-sm"
          loading="eager"
          decoding="async"
        />
      )}

      <div className="glass-search flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg">
        <input
          ref={inputRef}
          aria-label="Search gems"
          value={query}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={() => setOpen(Boolean(query.trim()))}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder:text-white/70 border-none focus:ring-0 outline-none"
        />

        <button
          type="button"
          onClick={() => onSubmit ? onSubmit(query) : inputRef.current?.focus()}
          className="btn-3d btn-3d-white btn-3d-sm md:btn-3d-md text-[var(--pg-sunset)] whitespace-nowrap"
          aria-label="Search"
        >
          Search
        </button>
      </div>

      {open && suggestions.length > 0 && (
        <ul
          ref={listRef}
          id="search-suggestions"
          role="listbox"
          aria-label="Search suggestions"
          className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 overflow-hidden"
        >
          {suggestions.map((s, i) => (
            <li
              key={s.id}
              role="option"
              aria-selected={selected === i}
              onMouseDown={() => chooseSuggestion(s)}
              onMouseEnter={() => setSelected(i)}
              className={`px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-start gap-3 ${selected === i ? "bg-slate-100" : ""}`}
            >
              <img
                src={s.img}
                alt={s.name}
                onError={(e) => ((e.currentTarget as HTMLImageElement).src = "/images/placeholder.jpg")}
                className="w-12 h-8 object-cover rounded-md flex-shrink-0"
              />
              <div>
                <div className="font-semibold text-sm">{s.name}</div>
                <div className="text-xs text-slate-500">{s.tags?.slice(0, 3).join(" · ")}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
