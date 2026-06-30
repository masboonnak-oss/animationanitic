import { ReactNode, useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Ported from masboonnak-oss/Triangle-Core (PageCard) — structure preserved.
// TriangleCore's motion.div owns x / rotateY / scale / opacity; this component
// only renders the card-internal visual effects so it never fights the orbit.

interface PageCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  accentColor: string;
  isActive: boolean;
  isExpanded?: boolean;
  cardIndex: number;
  onClick: () => void;
  children: ReactNode;
}

const FLOAT_CLASSES = ["float-card-0", "float-card-1", "float-card-2"];

export default function PageCard({
  title,
  icon,
  description,
  accentColor,
  isActive,
  isExpanded = false,
  cardIndex,
  onClick,
  children,
}: PageCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || isExpanded) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    },
    [isExpanded],
  );

  const handleMouseEnter = useCallback(() => {
    if (!isExpanded) setIsHovered(true);
  }, [isExpanded]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePos({ x: 0.5, y: 0.5 });
  }, []);

  // 3D tilt toward cursor — only for center (active) card, not in expanded mode
  const tiltX = isHovered && isActive && !isExpanded ? -((mousePos.y - 0.5) * 14) : 0;
  const tiltY = isHovered && isActive && !isExpanded ? (mousePos.x - 0.5) * 14 : 0;

  // Stable particle positions (useMemo so they don't re-randomize on re-render)
  const particles = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        id: i,
        left: `${12 + ((i * 37) % 76)}%`,
        top: `${8 + ((i * 29) % 78)}%`,
        delay: `${(i * 0.85).toFixed(2)}s`,
        duration: `${3.4 + (i % 3) * 1.6}s`,
        size: 4 + (i % 3) * 2,
      })),
    [],
  );

  const cardWidth = isExpanded ? "min(900px, 90vw)" : "340px";

  // Monochrome (black & white) glow — only the accent-colored BORDER stays
  // colorful, expressed as a crisp 1px ring; the bloom itself is white.
  const ring = `0 0 0 1px ${accentColor}80`;
  const glowBase = isActive
    ? `${ring}, 0 0 48px rgba(255,255,255,0.09), inset 0 0 20px rgba(255,255,255,0.03)`
    : `${ring}, 0 0 16px rgba(255,255,255,0.045), inset 0 0 10px rgba(255,255,255,0.02)`;

  const glowHover = `${ring}, 0 0 70px rgba(255,255,255,0.13), inset 0 0 20px rgba(255,255,255,0.05)`;
  const glowExpanded = `${ring}, 0 0 90px rgba(255,255,255,0.11), inset 0 0 28px rgba(255,255,255,0.04)`;

  return (
    <div
      style={{ width: cardWidth }}
      data-testid={`card-${title.toLowerCase()}`}
      onClick={!isExpanded ? onClick : undefined}
      className="cursor-pointer"
    >
      {/* Layer 2: float (skipped in expanded view to avoid jumping) */}
      <div className={!isExpanded ? FLOAT_CLASSES[cardIndex % 3] : ""}>
        {/* Tilt layer — responds to mouse on center card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="transition-transform duration-300 ease-out"
          style={{
            transform:
              isHovered && isActive && !isExpanded
                ? `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.06) translateZ(8px)`
                : "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)",
            willChange: "transform",
          }}
        >
          {/* Glass card body */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10,10,14,0.55)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: `1.5px solid ${accentColor}`,
              boxShadow: isExpanded ? glowExpanded : isHovered && isActive ? glowHover : glowBase,
              transition: "box-shadow 0.4s ease",
            }}
          >
            {/* Border light sweep */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
              <div
                className="absolute top-0 h-[2px] opacity-70"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                  width: "55%",
                  animation: "border-sweep 3.5s linear infinite",
                  animationDelay: `${cardIndex * -1.15}s`,
                }}
              />
              <div
                className="absolute bottom-0 h-[1px] opacity-35"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                  width: "40%",
                  animation: "border-sweep 5.5s linear infinite reverse",
                  animationDelay: `${cardIndex * -0.8}s`,
                }}
              />
            </div>

            {/* Reflection shimmer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
              <div
                className="absolute top-0 bottom-0 opacity-60"
                style={{
                  width: "40%",
                  background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.07), transparent)",
                  animation: "card-reflection 7s ease-in-out infinite",
                  animationDelay: `${cardIndex * -2.5}s`,
                }}
              />
            </div>

            {/* Header glow band (monochrome) */}
            <div
              className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-0"
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, transparent 100%)" }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    left: p.left,
                    top: p.top,
                    width: p.size,
                    height: p.size,
                    backgroundColor: "rgba(255,255,255,0.75)",
                    boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.4)`,
                    opacity: 0,
                    animation: `card-particle ${p.duration} ease-in-out infinite`,
                    animationDelay: p.delay,
                  }}
                />
              ))}
            </div>

            {/* Specular highlight — follows cursor on center card */}
            <AnimatePresence>
              {isHovered && isActive && !isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute pointer-events-none z-20 rounded-full"
                  style={{
                    left: `${mousePos.x * 100}%`,
                    top: `${mousePos.y * 100}%`,
                    width: 160,
                    height: 160,
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(circle, rgba(255,255,255,0.24), transparent 65%)",
                    filter: "blur(22px)",
                  }}
                />
              )}
            </AnimatePresence>

            {/* Card content */}
            <div className="relative z-10 p-6">
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${accentColor}`,
                    color: accentColor,
                    boxShadow: `0 0 18px ${accentColor}55`,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <h2
                    className="text-lg font-bold tracking-widest text-white/90"
                    style={{ textShadow: "0 0 14px rgba(255,255,255,0.25)" }}
                  >
                    {title}
                  </h2>
                  <p className="text-xs text-white/45 tracking-wider">{description}</p>
                </div>
              </div>

              <div className="relative z-10">{children}</div>
            </div>

            {/* Bottom breathing glow line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentColor}65, transparent)`,
                animation: "card-breathe 3s ease-in-out infinite",
                animationDelay: `${cardIndex * -1}s`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
