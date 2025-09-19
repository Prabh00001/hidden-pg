import type { Gem } from '../types';

export function getSuggestions(query: string, gems: Gem[], limit = 6): Gem[] {
  const q = (query || '').trim().toLowerCase();
  if (!q) return [];
  return gems.filter(g => {
    return (
      g.name.toLowerCase().includes(q) ||
      (g.tags || []).some(t => t.toLowerCase().includes(q)) ||
      (g.desc || '').toLowerCase().includes(q)
    );
  }).slice(0, limit);
}
