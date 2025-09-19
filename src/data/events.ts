import { EventItem } from "../types/event";

export const events: EventItem[] = [
  {
    id: "farmers-market-2025-09-13",
    title: "Prince George Farmers' Market",
    description: "Local produce, crafts, and live music.",
    start: "2025-09-13T09:00:00-07:00",
    end: "2025-09-13T14:00:00-07:00",
    location: "1310 3rd Ave, Prince George, BC",
    price: "Free",
    category: "community",
    tags: ["market", "local", "music"],
    image: "/images/events/farmers-market.jpg"
  },
  {
    id: "music-in-the-park-2025-09-20",
    title: "Music in the Park",
    description: "Outdoor concert featuring local bands.",
    start: "2025-09-20T18:30:00-07:00",
    end: "2025-09-20T20:30:00-07:00",
    location: "Lheidli T'enneh Memorial Park",
    price: "Free",
    category: "music",
    image: "/images/events/music-in-the-park.jpg"
  },
  {
    id: "pg-biz-mixer-2025-09-25",
    title: "PG Business Mixer",
    description: "Meet local founders and professionals.",
    start: "2025-09-25T17:00:00-07:00",
    end: "2025-09-25T19:00:00-07:00",
    location: "Hubspace, 1299 3rd Ave",
    price: "$10",
    category: "business",
    image: "/images/events/biz-mixer.jpg",
    url: "https://example.com/tickets"
  }
];
