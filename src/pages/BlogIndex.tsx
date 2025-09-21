import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import Seo from '@/components/Seo' // add this

export default function BlogIndex() {
  return (
    <>
      <Seo
        title="Hidden PG Blog — Local Guides & Tips"
        description="Hand-picked guides and local tips from Hidden PG: trails, cafés, hidden spots and weekend ideas."
        image="https://hiddenprincegeorge.ca/og-hero.jpg"
      />
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
        <p className="mt-2 text-slate-500">
          Hand-picked guides and local tips from Hidden PG.
        </p>
      </header>

      <ul className="grid gap-6">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/blog/${p.slug}`}
              className="group block rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition p-6"
            >
              {/* optional hero */}
              {p.hero && (
                <img
                  src={p.hero}
                  alt=""
                  className="mb-4 w-full h-48 object-cover rounded-xl border border-slate-200"
                />
              )}

              <div className="text-xs text-slate-500">
                {new Date(p.dateISO).toLocaleDateString()} • {p.readTimeMin} min read
              </div>

              <h2 className="mt-1 text-xl md:text-2xl font-semibold group-hover:underline text-slate-900">
                {p.title}
              </h2>

              <p className="mt-2 text-slate-600">{p.description}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 inline-flex items-center text-emerald-700 group-hover:text-emerald-800">
                Read the guide →
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
