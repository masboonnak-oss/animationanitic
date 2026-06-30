import { useCallback } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { OrbitItem } from "@/lib/orbit/orbit-items";
import { useOrbitController } from "@/lib/orbit/useOrbitController";
import { OrbitPanel } from "./OrbitPanel";

interface OrbitNavProps {
  items: OrbitItem[];
  /** Navigate to the page (Enter / click-when-focused / Open button). */
  onSelect: (item: OrbitItem) => void;
}

/**
 * The full rotating circular navigation system.
 *
 * Composes the headless controller (engine + inputs) with the glass UI:
 *   - a perspective 3D stage of orbiting panels,
 *   - a fixed glowing core at the pivot (parallax via a Framer MotionValue),
 *   - magnetic prev/next arrows, an indicator dock, and an ARIA live region.
 *
 * The active accent is published as the CSS variable `--orbit-accent`, which
 * `@property` (see index.css) transitions smoothly for dynamic lighting.
 */
export function OrbitNav({ items, onSelect }: OrbitNavProps) {
  const reduced = useReducedMotion() ?? false;

  // MotionValue fed by the controller each frame → drives core parallax.
  const rotationMV = useMotionValue(0);
  const coreSpin = useTransform(rotationMV, (r) => r * 12);
  const coreCounter = useTransform(rotationMV, (r) => r * -8);

  const handleActivate = useCallback((index: number) => onSelect(items[index]), [items, onSelect]);

  const { containerRef, getStageProps, getPanelRef, handlePanelClick, active, next, prev, focus } =
    useOrbitController({
      count: items.length,
      reducedMotion: reduced,
      onActivate: handleActivate,
      onFrame: (rotation) => rotationMV.set(rotation),
      idleSpin: 0.05,
    });

  const activeItem = items[active];
  const accent = activeItem?.accent ?? "#00d4ff";

  return (
    <div className="relative flex h-full w-full flex-col" style={{ ["--orbit-accent" as string]: accent }}>
      {/* ── 3D stage ─────────────────────────────────────────────── */}
      <div className="relative flex-1">
        <div
          ref={containerRef}
          {...getStageProps(
            `Rotating page navigation. ${items.length} pages. Focused: ${activeItem?.title}. Use arrow keys or W A S D to rotate, Enter to open.`,
          )}
          aria-activedescendant={`orbit-panel-${active}`}
          className="orbit-stage absolute inset-0 touch-none outline-none"
          style={{ perspective: "1600px", perspectiveOrigin: "50% 46%" }}
        >
          {/* Accent bloom behind the ring — color follows --orbit-accent. */}
          <div
            className="orbit-bloom pointer-events-none absolute left-1/2 top-[46%] h-[clamp(420px,52vw,720px)] w-[clamp(420px,52vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, var(--orbit-accent), transparent 62%)",
              opacity: 0.16,
              filter: "blur(36px)",
            }}
          />
          {/* Floor reflection glow. */}
          <div
            className="pointer-events-none absolute bottom-[14%] left-1/2 h-36 w-[62%] -translate-x-1/2 rounded-[100%]"
            style={{
              background: "radial-gradient(ellipse at center, var(--orbit-accent), transparent 70%)",
              opacity: 0.18,
              filter: "blur(40px)",
            }}
          />

          {/* Fixed glowing core at the pivot (decorative, behind panels). */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              style={{ rotate: coreSpin }}
              className="relative h-[clamp(150px,19vw,230px)] w-[clamp(150px,19vw,230px)] rounded-full"
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle at 50% 42%, var(--orbit-accent), transparent 68%)",
                  opacity: 0.22,
                  boxShadow: "0 0 140px 10px var(--orbit-accent)",
                  filter: "saturate(1.2)",
                }}
              />
              <motion.div
                style={{ rotate: coreCounter }}
                className="orbit-core-ring absolute inset-3 rounded-full border border-white/10"
              />
              <div className="absolute inset-[38%] rounded-full bg-white/5 backdrop-blur-sm" />
            </motion.div>
          </div>

          {/* Orbiting panels (lazy: lightweight previews, real pages load on navigate). */}
          <div className="orbit-ring absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {items.map((item, i) => (
              <OrbitPanel
                key={item.id}
                id={`orbit-panel-${i}`}
                index={i}
                ref={getPanelRef(i)}
                item={item}
                isActive={active === i}
                onClick={() => handlePanelClick(i)}
              />
            ))}
          </div>
        </div>

        {/* Magnetic arrows */}
        <button
          type="button"
          aria-label="Rotate to previous page"
          onClick={prev}
          className="orbit-arrow absolute left-3 top-1/2 z-40 -translate-y-1/2 sm:left-6"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          aria-label="Rotate to next page"
          onClick={next}
          className="orbit-arrow absolute right-3 top-1/2 z-40 -translate-y-1/2 sm:right-6"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* ── Dock: title, Open CTA, indicator dots, controls hint ──── */}
      <div className="relative z-40 mx-auto w-full max-w-3xl px-5 pb-8 text-center">
        <div className="mb-4 h-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem?.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-2xl font-bold tracking-tight" style={{ textShadow: "0 0 28px var(--orbit-accent)" }}>
                {activeItem?.title}
              </h2>
              <p className="mt-1 text-sm text-white/55">{activeItem?.subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => activeItem && onSelect(activeItem)}
          className="orbit-cta"
          style={{ ["--orbit-accent" as string]: accent }}
        >
          Open {activeItem?.title}
        </button>

        <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Pages">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to ${item.title}`}
              onClick={() => focus(i)}
              className="orbit-dot"
              data-active={active === i}
            />
          ))}
        </div>

        <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-white/35">
          Scroll · Drag · Arrow keys / WASD · Enter to open
        </p>
      </div>

      {/* Screen-reader announcement */}
      <p className="sr-only" aria-live="polite">
        {activeItem ? `Focused page: ${activeItem.title}` : ""}
      </p>
    </div>
  );
}
