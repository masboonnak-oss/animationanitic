import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import DrillCarousel from "./DrillCarousel";
import { ROOT_CARDS, type CardNode } from "@/lib/triangle/cardData";

// Ported from masboonnak-oss/Triangle-Core (TriangleCore) — structure preserved,
// extended so a leaf card can open the corresponding real page in the app.

interface StackLevel {
  cards: CardNode[];
  label: string;
  activeIndex: number;
}

const zoomVariants = {
  hidden: (dir: "in" | "out") => ({ scale: dir === "in" ? 0.45 : 1.65, opacity: 0, filter: "blur(18px)" }),
  visible: { scale: 1, opacity: 1, filter: "blur(0px)" },
  exit: (dir: "in" | "out") => ({ scale: dir === "in" ? 1.65 : 0.45, opacity: 0, filter: "blur(18px)" }),
};

function LeafPanel({ card, onClose }: { card: CardNode; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 flex items-center justify-center z-50"
      style={{ backdropFilter: "blur(10px)", background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, filter: "blur(12px)" }}
        animate={{ scale: 1, filter: "blur(0px)" }}
        exit={{ scale: 0.88, filter: "blur(12px)" }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative rounded-2xl overflow-hidden p-8 max-w-sm w-full mx-6"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${card.accentColor}50`,
          boxShadow: `0 0 80px ${card.accentColor}40, 0 0 30px ${card.accentColor}20, inset 0 0 28px ${card.accentColor}10`,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${card.accentColor}, transparent)` }}
        />

        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${card.accentColor}20`,
              border: `1px solid ${card.accentColor}60`,
              color: card.accentColor,
              boxShadow: `0 0 20px ${card.accentColor}40`,
            }}
          >
            {card.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-widest" style={{ color: card.accentColor, textShadow: `0 0 18px ${card.accentColor}90` }}>
              {card.title}
            </h2>
            <p className="text-xs text-white/45 tracking-wider">{card.subtitle}</p>
          </div>
        </div>

        <div className="text-sm">{card.panel ?? card.preview}</div>

        <div className="mt-6 text-center text-[10px] text-white/28 tracking-[0.22em]">CLICK OUTSIDE TO CLOSE</div>
      </motion.div>
    </motion.div>
  );
}

export default function TriangleCore() {
  const [stack, setStack] = useState<StackLevel[]>([{ cards: ROOT_CARDS, label: "CORE", activeIndex: 0 }]);
  const dirRef = useRef<"in" | "out">("in");
  const [direction, setDirection] = useState<"in" | "out">("in");
  const [leafCard, setLeafCard] = useState<CardNode | null>(null);

  const currentLevel = stack[stack.length - 1];
  const isRoot = stack.length === 1;
  const levelKey = stack.map((l) => l.label).join(">") + "|" + stack.length;

  const updateActiveIndex = useCallback((i: number) => {
    setStack((prev) => {
      const next = [...prev];
      next[next.length - 1] = { ...next[next.length - 1], activeIndex: i };
      return next;
    });
    setLeafCard(null);
  }, []);

  const handleSelect = useCallback((card: CardNode) => {
    if (card.children && card.children.length > 0) {
      dirRef.current = "in";
      setDirection("in");
      setStack((prev) => [...prev, { cards: card.children!, label: card.title, activeIndex: 0 }]);
      setLeafCard(null);
    } else {
      setLeafCard(card);
    }
  }, []);

  const goBack = useCallback(() => {
    setStack((prev) => {
      if (prev.length <= 1) return prev;
      dirRef.current = "out";
      setDirection("out");
      return prev.slice(0, -1);
    });
    setLeafCard(null);
  }, []);

  const activeCard = currentLevel.cards[currentLevel.activeIndex];
  const hasDrillHint = !!activeCard?.children?.length;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
      {/* Back button + breadcrumb — pinned top-left so it never overlaps the
          centered brand label. */}
      <AnimatePresence>
        {!isRoot && (
          <motion.div
            key="breadcrumb"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-4 left-4 z-40 flex items-center gap-3 sm:top-5 sm:left-5"
          >
            <button
              onClick={goBack}
              className="group flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-[0.18em] text-white/70 backdrop-blur-md transition-colors duration-200 hover:text-white"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)" }}
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              BACK
            </button>
            <div className="hidden items-center gap-1.5 text-[10px] tracking-[0.2em] sm:flex">
              {stack.map((level, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-white/20">›</span>}
                  <span className={i === stack.length - 1 ? "text-white/65" : "text-white/28"}>{level.label}</span>
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coverflow with zoom transition between levels */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={levelKey}
          custom={direction}
          variants={zoomVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.46, ease: "easeOut" }}
          className="w-full flex flex-col items-center"
        >
          <DrillCarousel
            cards={currentLevel.cards}
            activeIndex={currentLevel.activeIndex}
            onActiveChange={updateActiveIndex}
            onSelect={handleSelect}
          />

          {/* Nav dots */}
          <div className="flex gap-3 mt-5 z-10">
            {currentLevel.cards.map((_, i) => {
              const active = i === currentLevel.activeIndex;
              return (
                <button
                  key={i}
                  onClick={() => updateActiveIndex(i)}
                  data-testid={`dot-nav-${i}`}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: active ? 28 : 8,
                    height: 8,
                    background: active ? (activeCard?.accentColor ?? "#00D9FF") : "rgba(255,255,255,0.18)",
                    boxShadow: active ? `0 0 12px ${activeCard?.accentColor ?? "#00D9FF"}` : "none",
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Drill-in / open hint under the center card */}
      <AnimatePresence>
        {!leafCard && (
          <motion.div
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-14 text-center pointer-events-none z-10"
          >
            <span
              className="text-[10px] tracking-[0.28em] font-bold animate-pulse"
              style={{ color: activeCard?.accentColor, textShadow: `0 0 10px ${activeCard?.accentColor}` }}
            >
              {hasDrillHint ? "CLICK CENTER TO EXPLORE" : "CLICK CENTER FOR DETAILS"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom controls hint */}
      <div className="absolute bottom-4 text-white/18 text-[10px] tracking-[0.25em] font-medium flex gap-6 pointer-events-none z-10">
        <span>← ARROWS →</span>
        <span>SCROLL / DRAG</span>
        <span>{isRoot ? "CLICK CENTER TO DRILL IN" : "BACK TO GO UP"}</span>
      </div>

      {/* Leaf detail panel overlay */}
      <AnimatePresence>
        {leafCard && (
          <LeafPanel key={leafCard.id} card={leafCard} onClose={() => setLeafCard(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
