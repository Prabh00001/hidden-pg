import React, { useEffect, useRef, useState } from "react";

const HEADER_OFFSET = 84; // adjust if your fixed header changes

function scrollToId(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  const top = window.scrollY + rect.top - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}

function focusTarget(selector: string, delay = 350) {
  setTimeout(() => {
    document.querySelector<HTMLButtonElement>(selector)?.focus();
  }, delay);
}

function flash(id: string, delay = 320) {
  const el = document.getElementById(id);
  if (!el) return;
  setTimeout(() => {
    el.classList.add("target-flash");
    setTimeout(() => el.classList.remove("target-flash"), 900);
  }, delay);
}

// --- Singleton guard so only ONE MobileStickyCTA can exist at a time
let __HPG_STICKY_MOUNTED__ = false;

export default function MobileStickyCTA() {
  const [skip, setSkip] = useState(false);
  useEffect(() => {
    if (__HPG_STICKY_MOUNTED__) {
      setSkip(true); // another instance already on the page
      return;
    }
    __HPG_STICKY_MOUNTED__ = true;
    return () => {
      __HPG_STICKY_MOUNTED__ = false;
    };
  }, []);
  if (skip) return null;

  const [hidden, setHidden] = useState(false); // hide while scrolling down
  const [block, setBlock] = useState(false);   // hide when footer or #cta-bottom visible
  const lastY = useRef(0);

  // Hide on scroll down; show on scroll up; also hide when near absolute page bottom
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const down = y > lastY.current;
      lastY.current = y;

      const doc = document.documentElement;
      const nearBottom = y + window.innerHeight >= doc.scrollHeight - 160;

      setHidden((down && y > 80 && !block) || nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [block]);

  // Hide when CTA card OR footer is visible (trigger early at footer start)
  useEffect(() => {
    const targets: Element[] = [];
    const cta = document.getElementById("cta-bottom");
    const footer = document.querySelector("footer");
    if (cta) targets.push(cta);
    if (footer) targets.push(footer);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        setBlock(anyVisible);
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`sm:hidden fixed inset-x-2 bottom-3 z-40 transition-transform duration-300 pointer-events-none
      ${hidden || block ? "translate-y-[140%]" : "translate-y-0"}`}
    >
      <div className="pointer-events-auto rounded-2xl border border-slate-200 bg-white/90 backdrop-blur shadow-xl p-2.5 pb-[max(10px,env(safe-area-inset-bottom))]">
        <p className="text-[13px] text-slate-800">
          Are you a local business? <span className="font-semibold">Feature your business</span> on Hidden PG.
        </p>
        <div className="mt-2 grid grid-cols-[3fr_2fr] gap-2">
          {/* CHANGED: href now anchors to the in-article block and intercepts to smooth-scroll */}
          <a
            href="#feature-business"
            className="btn-3d btn-3d-emerald btn-3d-sm whitespace-nowrap text-[13px] leading-tight px-3"
            onClick={(e) => {
              (window as any).gtag?.("event", "cta_feature_click", { from: "mobile_sticky" });
              if (scrollToId("feature-business")) {
                e.preventDefault();
                focusTarget("#pgFeatureForm button, #feature-business button");
                flash("feature-business");
              }
            }}
          >
            Feature your business
          </a>

          <a
            href="#email-capture"
            className="btn-3d btn-3d-white btn-3d-sm w-full"
            onClick={(e) => {
              (window as any).gtag?.("event", "cta_itinerary_click", { from: "mobile_sticky" });
              if (scrollToId("email-capture")) {
                e.preventDefault();
                focusTarget("#email-capture button");
                flash("email-capture");
              }
            }}
          >
            Get itinerary
          </a>
        </div>
      </div>
    </div>
  );
}
