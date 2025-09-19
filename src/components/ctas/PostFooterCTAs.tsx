import React from "react";
import NewsletterInline from "./NewsletterInline";
import ItineraryInline from "./ItineraryInline";
import FeatureBusinessInline from "./FeatureBusinessInline";

export default function PostFooterCTAs() {
  return (
    <section id="post-footer-ctas" className="mt-10 grid gap-6 md:grid-cols-2">
      <div className="grid gap-6">
        <NewsletterInline source="blog_footer" />
        <ItineraryInline source="blog_footer" />
      </div>
      <FeatureBusinessInline source="blog_footer" />
    </section>
  );
}
