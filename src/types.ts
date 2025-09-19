export type Category =
  | 'Museums' | 'Nature' | 'Food' | 'Parks' | 'Trails'
  | 'Art' | 'Shopping' | 'Events' | 'Cafes' | 'Other';

export interface Gem {
  id: string;
  name: string;
  category: Category;
  tags: string[];
  img: string;
  desc: string;
  location?: string;
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
