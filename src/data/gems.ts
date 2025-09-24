import { Gem } from '../types';

export const GEMS: Gem[] = [
  {
    id: "gem-###",                 // unique
    title: "Golden Bento",         // example
    slug: "golden-bento-prince-george",
    category: "Food",
    description: "Cozy Japanese spot known for hearty bentos, house sauces, and friendly service.",
    image: "/images/gems/golden-bento/cover.jpg", // hero image
    images: [
      "/images/gems/golden-bento/1.jpg",
      "/images/gems/golden-bento/2.jpg",
      "/images/gems/golden-bento/3.jpg"
    ],
    address: "123 4th Ave, Prince George, BC",
    mapsUrl: "https://www.google.com/maps?cid=XXXXXXXXX", // paste their Maps CID link if you have it
    website: "https://goldenbento.example.com",
    phone: "+1250XXXXXXX",
    instagram: "https://www.instagram.com/goldenbento",
    sponsored: false,
    featured: true, // set true if you want in your featured section
    photoCredit: { name: "Golden Bento", url: "https://goldenbento.example.com" },
  },
];
