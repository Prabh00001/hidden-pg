import React from "react";

export default function SeoJsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      // IMPORTANT: do not pretty-print; JSON must be compact & valid
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
