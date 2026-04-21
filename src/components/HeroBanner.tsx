"use client";

import Image from "next/image";

// The live site cycles through pastel color palettes — purple, pink, blue, mint
const colorStops = [
  { from: "#b8a9d4", to: "#d4b8ce" }, // lavender → mauve
  { from: "#d4b8ce", to: "#f0d0e0" }, // mauve → blush
  { from: "#a9b8d4", to: "#b8d4d0" }, // periwinkle → sage
  { from: "#b8d4d0", to: "#b8a9d4" }, // sage → back to lavender
];

export default function HeroBanner() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "clamp(130px, 16vw, 190px)" }}>
      {/* Yarn texture 1 — fades in/out every 9s */}
      <div className="absolute inset-0" style={{ animation: "tex1 27s ease-in-out infinite" }}>
        <Image src="/images/yarn-texture-1.jpg" alt="" fill className="object-cover" aria-hidden priority />
      </div>
      {/* Yarn texture 2 */}
      <div className="absolute inset-0" style={{ animation: "tex2 27s ease-in-out infinite" }}>
        <Image src="/images/yarn-texture-2.jpg" alt="" fill className="object-cover" aria-hidden />
      </div>
      {/* Yarn texture 3 */}
      <div className="absolute inset-0" style={{ animation: "tex3 27s ease-in-out infinite" }}>
        <Image src="/images/yarn-texture-3.jpg" alt="" fill className="object-cover" aria-hidden />
      </div>

      {/* Color-cycling tint over the textures */}
      <div
        className="absolute inset-0"
        style={{
          animation: "colorCycleTint 27s ease-in-out infinite",
          opacity: 0.45,
          mixBlendMode: "color",
        }}
      />

      {/* Decorative floating circles */}
      {[
        { top: "15%", left: "5%", size: 28 },
        { top: "60%", left: "12%", size: 16 },
        { top: "20%", left: "22%", size: 10 },
        { top: "70%", left: "35%", size: 20 },
        { top: "15%", right: "8%", size: 24 },
        { top: "65%", right: "15%", size: 14 },
        { top: "30%", right: "28%", size: 10 },
        { top: "55%", right: "5%", size: 18 },
      ].map((circle, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-white/40"
          style={{
            top: circle.top,
            left: "left" in circle ? circle.left : undefined,
            right: "right" in circle ? circle.right : undefined,
            width: circle.size,
            height: circle.size,
            background: "transparent",
            animation: `float ${3 + (i % 3)}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {/* Banner content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">

        {/* Logo — single PNG from live site (hero-4.png = AWTSC.png, 3000×3000 transparent) */}
        <Image
          src="/images/hero-4.png"
          alt="AW That's So Cute"
          width={700}
          height={700}
          style={{
            width: "auto",
            height: "260%",
            filter: "brightness(0) invert(1)",
          }}
          priority
        />
      </div>

      <style jsx global>{`
        /*
          27s cycle. Crossfades overlap by 3s so opacity sum never drops below 1.
          tex1: visible 0-6s, fade out 6-9s, hidden 9-24s, fade in 24-27s
          tex2: fade in 6-9s, visible 9-15s, fade out 15-18s, hidden 18-27s
          tex3: hidden 0-15s, fade in 15-18s, visible 18-24s, fade out 24-27s
        */
        @keyframes tex1 {
          0%, 22%   { opacity: 1; }
          33%        { opacity: 0; }
          89%        { opacity: 0; }
          100%       { opacity: 1; }
        }
        @keyframes tex2 {
          0%, 22%   { opacity: 0; }
          33%, 56%  { opacity: 1; }
          67%, 100% { opacity: 0; }
        }
        @keyframes tex3 {
          0%, 56%   { opacity: 0; }
          67%, 89%  { opacity: 1; }
          100%       { opacity: 0; }
        }

        /* Color tint synced — shifts smoothly through lavender → pink → blue */
        @keyframes colorCycleTint {
          0%,  5%   { background: #c8a9d4; }
          28%, 38%  { background: #d4a9bc; }
          61%, 72%  { background: #a9bcdc; }
          95%, 100% { background: #c8a9d4; }
        }

        @keyframes float {
          from { transform: translateY(0px); }
          to   { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
