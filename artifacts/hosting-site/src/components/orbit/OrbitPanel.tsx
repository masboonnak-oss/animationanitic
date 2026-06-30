import { forwardRef } from "react";
import type { OrbitItem } from "@/lib/orbit/orbit-items";

interface OrbitPanelProps {
  id: string;
  index: number;
  item: OrbitItem;
  isActive: boolean;
  onClick: () => void;
}

/**
 * A single glassmorphic orbit panel. Purely presentational: the controller
 * writes transform/opacity/filter imperatively each frame, so this component
 * only renders structure + static styling and never animates via React.
 *
 * Initial opacity is 0 (the controller fades it in) to avoid a stacked-cards
 * flash on first paint.
 */
export const OrbitPanel = forwardRef<HTMLDivElement, OrbitPanelProps>(
  ({ id, index, item, isActive, onClick }, ref) => {
    const Icon = item.icon;
    return (
      <div
        ref={ref}
        id={id}
        role="option"
        aria-selected={isActive}
        aria-label={`${item.title}. ${item.subtitle}`}
        onClick={onClick}
        className="orbit-panel absolute left-1/2 top-1/2 h-[clamp(248px,32vh,330px)] w-[clamp(186px,21vw,260px)] cursor-pointer select-none"
        style={{ willChange: "transform, opacity, filter", backfaceVisibility: "hidden", opacity: 0 }}
      >
        <div
          className={`relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border bg-white/[0.045] p-6 backdrop-blur-md transition-[border-color] duration-300 ${
            isActive ? "border-white/25" : "border-white/10"
          }`}
          style={{
            boxShadow: isActive
              ? `0 0 0 1px ${item.accent}55, 0 32px 80px -24px ${item.accent}99, inset 0 1px 0 rgba(255,255,255,0.14)`
              : "0 24px 60px -32px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* top sheen / dynamic lighting */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(125% 80% at 50% -12%, ${item.accent}2e, transparent 62%)` }}
          />
          {/* animated conic glow when focused */}
          <div
            className="pointer-events-none absolute -inset-px rounded-[28px] transition-opacity duration-500"
            style={{
              opacity: isActive ? 0.55 : 0,
              background: `conic-gradient(from 140deg, transparent, ${item.accent}66, transparent 55%)`,
            }}
          />
          {/* top highlight line */}
          <div
            className="pointer-events-none absolute inset-x-6 top-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${item.accent}aa, transparent)` }}
          />

          <div className="relative flex items-start justify-between">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: `${item.accent}1f`,
                border: `1px solid ${item.accent}55`,
                boxShadow: `0 0 26px ${item.accent}40`,
              }}
            >
              <Icon className="h-6 w-6" style={{ color: item.accent }} />
            </span>
            <span className="font-mono text-sm font-semibold tabular-nums text-white/25">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="relative mt-auto text-2xl font-bold leading-tight text-white">{item.title}</h3>
          <p className="relative mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">{item.subtitle}</p>
          <div
            className="relative mt-5 text-xs font-medium tracking-wide"
            style={{ color: isActive ? item.accent : "rgba(255,255,255,0.32)" }}
          >
            {isActive ? "Press Enter or click to open →" : "Rotate to focus"}
          </div>
        </div>
      </div>
    );
  },
);

OrbitPanel.displayName = "OrbitPanel";
