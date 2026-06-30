import { forwardRef, useRef } from "react";
import type { OrbitItem } from "@/lib/orbit/orbit-items";

interface OrbitPanelProps {
  id: string;
  index: number;
  item: OrbitItem;
  isActive: boolean;
  reduced: boolean;
  onClick: () => void;
}

/**
 * A "living" collectible-style orbit card.
 *
 * Three independent motion layers compose with the controller so cards never
 * sit still (and never fight the orbit transform):
 *   - Layer 1 (this forwarded ref): orbit position — written imperatively by
 *     the controller every frame.
 *   - Layer 2 (.orbit-float): floats up/down and gently swings (CSS).
 *   - Layer 3 (.orbit-breathe): slow self-rotation + breathing scale (CSS).
 *   - Layer 4 (.orbit-tilt): hover 3D tilt toward the cursor (JS, ref-driven).
 *
 * Decorative layers add a breathing glow, a sweeping border light, a moving
 * reflection, and (on the focused card) floating particles. Per-card animation
 * delays are derived from the index so the deck feels alive, not synchronized.
 * All idle motion is transform/opacity only (GPU) and is disabled under
 * prefers-reduced-motion by the global rule in index.css.
 */
export const OrbitPanel = forwardRef<HTMLDivElement, OrbitPanelProps>(
  ({ id, index, item, isActive, reduced, onClick }, ref) => {
    const Icon = item.icon;
    const tiltRef = useRef<HTMLDivElement>(null);

    const floatDelay = `${-((index * 0.83) % 6).toFixed(2)}s`;
    const breatheDelay = `${-((index * 1.27) % 5).toFixed(2)}s`;
    const glowDelay = `${-((index * 0.59) % 7).toFixed(2)}s`;
    const sweepDelay = `${-((index * 1.7) % 9).toFixed(2)}s`;

    const onMove = (e: React.PointerEvent) => {
      if (reduced) return;
      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const t = tiltRef.current;
      if (t) {
        t.style.transform =
          `perspective(820px) rotateY(${(px * 16).toFixed(2)}deg) rotateX(${(-py * 16).toFixed(2)}deg) ` +
          `scale(1.1) translateY(-8px)`;
      }
    };
    const onLeave = () => {
      const t = tiltRef.current;
      if (t) t.style.transform = "";
    };

    return (
      <div
        ref={ref}
        id={id}
        role="option"
        aria-selected={isActive}
        aria-label={`${item.title}. ${item.subtitle}`}
        onClick={onClick}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="orbit-card group absolute left-1/2 top-1/2 h-[clamp(250px,34vh,340px)] w-[clamp(184px,20vw,250px)] cursor-pointer select-none"
        style={{ willChange: "transform, opacity, filter", backfaceVisibility: "hidden", opacity: 0 }}
      >
        {/* Layer 2 — float + swing */}
        <div className="orbit-float h-full w-full" style={{ animationDelay: floatDelay }}>
          {/* Layer 3 — self-rotate + breathe */}
          <div className="orbit-breathe h-full w-full" style={{ animationDelay: breatheDelay }}>
            {/* Layer 4 — hover tilt */}
            <div ref={tiltRef} className="orbit-tilt h-full w-full">
              {/* breathing glow */}
              <div
                className="orbit-glow pointer-events-none absolute -inset-6 rounded-[40px]"
                style={{ background: `radial-gradient(circle, ${item.accent}, transparent 65%)`, animationDelay: glowDelay }}
              />

              {/* animated gradient border */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[26px]">
                <div
                  className="orbit-border-sweep absolute left-1/2 top-1/2 h-[180%] w-[180%] -translate-x-1/2 -translate-y-1/2"
                  style={{ background: `conic-gradient(from 0deg, transparent, ${item.accent}, transparent 32%)`, animationDelay: sweepDelay }}
                />
              </div>

              {/* card surface */}
              <div
                className="absolute inset-[1.5px] flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b14]/90 p-5 transition-colors duration-300 group-hover:border-white/25"
                style={{
                  boxShadow: isActive
                    ? `0 30px 80px -24px ${item.accent}aa, inset 0 1px 0 rgba(255,255,255,0.14)`
                    : "0 24px 60px -34px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {/* top sheen */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: `radial-gradient(125% 80% at 50% -10%, ${item.accent}26, transparent 60%)` }}
                />
                {/* moving reflection */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="orbit-reflection absolute -inset-y-4 left-0 w-1/3" style={{ animationDelay: sweepDelay }} />
                </div>

                {/* content */}
                <div className="relative flex items-start justify-between">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${item.accent}1f`, border: `1px solid ${item.accent}55`, boxShadow: `0 0 26px ${item.accent}40` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: item.accent }} />
                  </span>
                  <span className="font-mono text-sm font-semibold tabular-nums text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-auto text-xl font-bold leading-tight text-white">{item.title}</h3>
                <p
                  className="relative mt-2 line-clamp-3 text-sm leading-relaxed text-white/55 transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0 }}
                >
                  {item.subtitle}
                </p>
                <div
                  className="relative mt-3 text-xs font-medium transition-opacity duration-300"
                  style={{ color: item.accent, opacity: isActive ? 1 : 0 }}
                >
                  Press Enter or click to open →
                </div>

                {/* floating particles (focused card only, for performance) */}
                {isActive && !reduced && (
                  <>
                    <span className="orbit-particle" style={{ left: "18%", bottom: "16%", animationDelay: "0s", background: item.accent }} />
                    <span className="orbit-particle" style={{ left: "72%", bottom: "26%", animationDelay: "-1.4s", background: item.accent }} />
                    <span className="orbit-particle" style={{ left: "44%", bottom: "10%", animationDelay: "-2.6s", background: item.accent }} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

OrbitPanel.displayName = "OrbitPanel";
