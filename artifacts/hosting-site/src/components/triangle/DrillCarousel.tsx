import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import type { CardNode } from "@/lib/triangle/cardData";
import PageCard from "./PageCard";

// Ported from masboonnak-oss/Triangle-Core (DrillCarousel) + touch/drag added.

interface DrillCarouselProps {
  cards: CardNode[];
  activeIndex: number;
  onActiveChange: (i: number) => void;
  onSelect: (card: CardNode) => void;
}

// Relative position in the ring (wraps for any N)
function getRelPos(cardIndex: number, activeIndex: number, total: number): number {
  const diff = (((cardIndex - activeIndex) % total) + total) % total;
  const half = Math.floor(total / 2);
  return diff > half ? diff - total : diff;
}

// Visual transform per position slot
function tfFor(relPos: number) {
  const abs = Math.abs(relPos);
  const sign = relPos < 0 ? -1 : 1;
  if (abs === 0) return { x: 0, rotateY: 0, scale: 1.0, opacity: 1.0, zIndex: 20 };
  if (abs === 1) return { x: sign * 380, rotateY: sign * -42, scale: 0.58, opacity: 0.75, zIndex: 15 };
  if (abs === 2) return { x: sign * 635, rotateY: sign * -58, scale: 0.36, opacity: 0.4, zIndex: 10 };
  return { x: sign * 860, rotateY: 0, scale: 0.2, opacity: 0, zIndex: 0 };
}

const SPRING = { type: "spring", stiffness: 320, damping: 32, mass: 0.75 } as const;

export default function DrillCarousel({ cards, activeIndex, onActiveChange, onSelect }: DrillCarouselProps) {
  const N = cards.length;
  const wheelCooldown = useRef(false);
  const dragStartX = useRef<number | null>(null);
  const dragged = useRef(false);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      onActiveChange((((activeIndex + dir) % N) + N) % N);
    },
    [activeIndex, N, onActiveChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") navigate(1);
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") navigate(-1);
    };

    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (wheelCooldown.current || Math.abs(delta) < 30) return;
      navigate(delta > 0 ? 1 : -1);
      wheelCooldown.current = true;
      setTimeout(() => {
        wheelCooldown.current = false;
      }, 700);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    };
  }, [navigate]);

  // ── Touch / mouse drag to rotate ────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragged.current = false;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current == null) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 60) {
      navigate(dx < 0 ? 1 : -1);
      dragStartX.current = e.clientX; // allow continuous swiping
      dragged.current = true;
    }
  };
  const onPointerUp = () => {
    dragStartX.current = null;
  };

  return (
    <div
      className="relative flex items-center justify-center w-full touch-pan-y"
      style={{ height: 480, perspective: "1400px", perspectiveOrigin: "50% 50%" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {cards.map((card, index) => {
        const relPos = getRelPos(index, activeIndex, N);
        const tf = tfFor(relPos);
        const isCenter = relPos === 0;

        return (
          <motion.div
            key={card.id}
            animate={{ x: tf.x, rotateY: tf.rotateY, scale: tf.scale, opacity: tf.opacity }}
            transition={SPRING}
            style={{
              position: "absolute",
              zIndex: tf.zIndex,
              willChange: "transform, opacity",
              transformStyle: "preserve-3d",
              cursor: isCenter && card.children?.length ? "zoom-in" : "pointer",
            }}
            onClick={() => {
              if (dragged.current) return; // ignore click that ended a drag
              if (isCenter) onSelect(card);
              else navigate(relPos > 0 ? 1 : -1);
            }}
            data-testid={`carousel-card-${card.id}`}
          >
            <PageCard
              title={card.title}
              icon={card.icon}
              description={card.subtitle}
              accentColor={card.accentColor}
              isActive={isCenter}
              isExpanded={false}
              cardIndex={index % 3}
              onClick={() => {}}
            >
              {card.preview}
            </PageCard>
          </motion.div>
        );
      })}
    </div>
  );
}
