export type EventCategory =
  | "music" | "food" | "sports" | "family" | "arts"
  | "community" | "business" | "outdoors" | "other";

export interface EventItem {
  id: string;
  title: string;
  description?: string;
  start: string;         // ISO string, e.g., "2025-09-12T18:00:00-07:00"
  end?: string;          // ISO; optional
  location: string;      // venue/city
  address?: string;      // street, optional
  image?: string;        // /images/... or external
  url?: string;          // ticket or info link
  price?: string;        // "Free", "$10", "Varies"
  category?: EventCategory;
  tags?: string[];
}
