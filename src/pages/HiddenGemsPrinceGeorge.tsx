import { Helmet } from 'react-helmet-async';

export default function HiddenGemsPrinceGeorge() {
  const title = "Hidden Gems in Prince George, BC (Local Guide)";
  const desc  = "A curated, always-updated list of hidden gems in Prince George: trails, viewpoints, cafes, galleries, and family-friendly places locals love.";
  const url   = "https://hiddenprincegeorge.ca/hidden-gems-prince-george";

  const items = [
    { name: "Ancient Forest / Chun T’oh Whudujut", url: "https://hiddenprincegeorge.ca/gems/ancient-forest" },
    { name: "LC Gunn Park Lookout", url: "https://hiddenprincegeorge/gems/lc-gunn-park" },
    { name: "Two Rivers Gallery", url: "https://hiddenprincegeorge/gems/two-rivers-gallery" },
    // add your real gem URLs as you publish them
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org",
          "@type":"ItemList",
          "name":"Hidden Gems in Prince George",
          "itemListElement": items.map((it, i) => ({
            "@type":"ListItem", "position": i+1, "name": it.name, "url": it.url
          }))
        })}</script>
      </Helmet>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold">Hidden Gems in Prince George, BC</h1>
        <p className="mt-2 text-slate-600">{desc}</p>

        <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <a key={it.url} href={it.url}
               className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-slate-900">{it.name}</h3>
              <p className="mt-1 text-sm text-slate-600">Why it’s special, best time to visit, parking tips…</p>
            </a>
          ))}
        </section>

        <section className="mt-10 prose">
          <h2>FAQ</h2>
          <p><strong>Best time to explore?</strong> Spring–fall for trails; galleries & cafes are great year-round.</p>
          <p><strong>Family friendly?</strong> Many are; check individual pages for stroller/wheelchair notes.</p>
        </section>
      </main>
    </>
  );
}
