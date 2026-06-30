import { useMemo } from "react";

// Deep-space backdrop for the Triangle-Core navigation — monochrome (black &
// white) so the cards read as if floating in space. Card accent colors are kept
// on the card borders only (see PageCard).
export default function Background() {
  const stars = useMemo(
    () =>
      Array.from({ length: 150 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 1.4 + 0.4,
        opacity: Math.random() * 0.32 + 0.12,
        duration: (Math.random() * 4 + 3).toFixed(2),
        delay: (Math.random() * 6).toFixed(2),
      })),
    [],
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#040407]">
      {/* perspective grid — faint white */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          transform: "perspective(520px) rotateX(62deg) translateY(-120px) translateZ(-200px)",
        }}
      />

      {/* faint white nebulae for depth */}
      <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-white mix-blend-screen blur-[170px] opacity-[0.05] animate-pulse-glow" />
      <div
        className="absolute bottom-[18%] right-[20%] h-[520px] w-[520px] rounded-full bg-white mix-blend-screen blur-[150px] opacity-[0.04] animate-pulse-glow"
        style={{ animationDelay: "1.6s" }}
      />

      {/* starfield */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <span
            key={s.id}
            className="star-twinkle absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              boxShadow: "0 0 3px rgba(255,255,255,0.45)",
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 50%, transparent 52%, rgba(0,0,0,0.72))" }}
      />

      {/* film grain */}
      <div className="absolute inset-0 opacity-[0.12] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
    </div>
  );
}
