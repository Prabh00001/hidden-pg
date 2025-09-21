import { Link } from "react-router-dom";
import Seo from '@/components/Seo'

export default function PrivacyPage() {
  return (
    <>
    <Seo
        title="Privacy Policy — Hidden PG"
        description="How Hidden PG collects, uses and protects your information."
      />
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-slate-600">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="mt-8 space-y-4 text-slate-700">
        <p>
          Hidden PG (“we”, “our”, “us”) operates a local discovery website for Prince George. 
          This policy explains what we collect, why we collect it, and how you can manage your information.
        </p>

        <h2 className="mt-8 text-xl font-semibold">1) Information we collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Contact details you provide</strong> — for example, your email when you suggest a gem, submit a story, 
            or ask to feature your business.
          </li>
          <li>
            <strong>Business information</strong> — details you submit for a listing (name, address, website, social links, description, images, offers).
          </li>
          <li>
            <strong>Photos & media</strong> — images sent to us or uploaded through our forms. 
            By submitting, you confirm you own rights to share them or have permission from the owner.
          </li>
          <li>
            <strong>Usage data</strong> — anonymized analytics (page views, clicks, device type, approximate location) used to improve the site.
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">2) How we use information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Publish and maintain listings, events, and featured placements.</li>
          <li>Respond to questions and support requests.</li>
          <li>Send optional updates (e.g., newsletter, performance summaries for featured partners).</li>
          <li>Improve content ranking and user experience using aggregate analytics.</li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">3) Photos & image rights</h2>
        <p>
          If you submit photos, you grant us a non-exclusive license to display them on Hidden PG and our social profiles 
          for the purpose of showcasing local gems and your business. 
          You can request removal at any time; we’ll remove images from our site, but external shares or caches may persist.
        </p>

        <h2 className="mt-8 text-xl font-semibold">4) Data sharing</h2>
        <p>
          We don’t sell personal data. We use trusted vendors (e.g., analytics, form processing, email) who process data on our behalf 
          under confidentiality and security obligations.
        </p>

        <h2 className="mt-8 text-xl font-semibold">5) Retention</h2>
        <p>
          We keep contact and business info as long as it’s needed to operate your listing or support requests. 
          You can ask us to delete your information and we’ll do so unless we must keep it for legal or operational reasons 
          (e.g., billing records).
        </p>

        <h2 className="mt-8 text-xl font-semibold">6) Your choices</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Request a copy or deletion of your data by emailing <a className="underline" href="mailto:hello@hiddenprincegeorge.ca">hello@hiddenprincegeorge.ca</a>.</li>
          <li>Opt out of non-essential emails anytime (unsubscribe link or email us).</li>
          <li>Request image removal if you no longer want your photos displayed.</li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">7) Children</h2>
        <p>
          Hidden PG is not directed to children under 13. If we learn we collected information from a child, we’ll delete it.
        </p>

        <h2 className="mt-8 text-xl font-semibold">8) Changes to this policy</h2>
        <p>
          We may update this policy. We’ll revise the “Last updated” date above and, when material, provide a notice on the site.
        </p>

        <h2 className="mt-8 text-xl font-semibold">9) Contact</h2>
        <p>
          Questions? Email us at <a className="underline" href="mailto:hello@hiddenprincegeorge.ca">hello@hiddenprincegeorge.ca</a>.
        </p>

        <div className="mt-10">
          <Link to="/" className="text-sunset-600 underline hover:no-underline">← Back to home</Link>
        </div>
      </section>
    </main>
    </>
  );
}
