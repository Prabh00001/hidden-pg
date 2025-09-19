import { useEffect } from "react";

type Meta = { name?: string; property?: string; content: string };
function ensureMeta(attr: "name" | "property", value: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Head({
  title,
  description,
  image = "/og-hero.jpg",
}: {
  title: string;
  description: string;
  image?: string;
}) {
  useEffect(() => {
    document.title = title;
    ensureMeta("name", "description", description);
    ensureMeta("property", "og:title", title);
    ensureMeta("property", "og:description", description);
    ensureMeta("property", "og:type", "article");
    ensureMeta("property", "og:image", image);
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", title);
    ensureMeta("name", "twitter:description", description);
    ensureMeta("name", "twitter:image", image);
  }, [title, description, image]);
// Add above your return (or inline) so we can reuse it
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://hiddenprincegeorge.ca/#org",
  "name": "Hidden Prince George",
  "url": "https://hiddenprincegeorge.ca",
  "logo": "https://hiddenprincegeorge.ca/android-chrome-192x192.png",
  "email": "mailto:hello@hiddenprincegeorge.ca",
  "sameAs": [
    // add when ready: "https://www.instagram.com/...", "https://www.facebook.com/..."
  ]
};

// Inside your Head component JSX (e.g., inside <Helmet> or your <head> wrapper)
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
/>

  return null;
}
