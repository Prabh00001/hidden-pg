import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">About Hidden PG</h1>
      <p className="mt-4 text-slate-700">
        Hidden PG helps Prince George locals and visitors discover the city’s lesser-known places — trails, tastes, parks, small businesses, and community events.
      </p>

      <section className="mt-8 space-y-6 text-slate-700">
        <div>
          <h2 className="text-xl font-semibold">What we do</h2>
          <p className="mt-2">
            We research, photograph, and organize gems into easy-to-browse collections. 
            Our goal is to boost local exploration and support small businesses with clear information and useful links.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">How businesses benefit</h2>
          <ul className="mt-2 list-disc pl-6 space-y-2">
            <li>Get discovered by people planning their weekend</li>
            <li>Drive clicks to your website and Instagram</li>
            <li>Show up in local searches through better internal linking</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">How we keep it trustworthy</h2>
          <ul className="mt-2 list-disc pl-6 space-y-2">
            <li>Clear labeling of featured placements</li>
            <li>We correct or remove outdated info quickly on request</li>
            <li>We welcome community suggestions and photo contributions</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Get in touch</h2>
          <p className="mt-2">
            Questions, suggestions, or partnership ideas? Email <a className="underline" href="mailto:hello@hiddenprincegeorge.ca">hello@hiddenprincegeorge.ca</a>.
          </p>
        </div>

        <div className="mt-8">
          <Link to="/" className="text-sunset-600 underline hover:no-underline">← Back to home</Link>
        </div>
      </section>
    </main>
  );
}
