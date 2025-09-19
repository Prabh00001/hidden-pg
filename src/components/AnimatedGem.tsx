// src/components/AnimatedGem.tsx
import React from "react";

type GemProps = {
  className?: string;   // e.g., "absolute left-10 top-6"
  size?: number;        // px
  hue?: number;         // 150–300 looks good
  anim?: "slow" | "med" | "fast";
  parallax?: number;    // 0..1 intensity used by Hero's mouse parallax
};

export default function AnimatedGem({
  className = "",
  size = 72,
  hue = 170,
  anim = "med",
  parallax = 0.4,
}: GemProps) {
  const animClass =
    anim === "slow" ? "animate-float-slow" :
    anim === "fast" ? "animate-float-fast" : "animate-float-med";

  return (
    <div
      className={`pointer-events-none select-none ${className} ${animClass}`}
      style={{ width: size, height: size, transformStyle: "preserve-3d" }}
      data-parallax={parallax}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs>
          <linearGradient id={`g${hue}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={`hsl(${hue},70%,65%)`} />
            <stop offset="100%" stopColor={`hsl(${hue + 30},75%,45%)`} />
          </linearGradient>
        </defs>
        {/* body */}
        <polygon
          points="10,60 30,20 70,20 90,60 50,95"
          fill={`url(#g${hue})`}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
        />
        {/* top gloss */}
        <polygon
          points="30,20 50,5 70,20 50,35"
          fill="rgba(255,255,255,0.18)"
        />
      </svg>
    </div>
  );
}
    