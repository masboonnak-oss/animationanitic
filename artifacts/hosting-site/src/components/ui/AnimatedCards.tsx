import { useEffect, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from "framer-motion";

const SHAPES = [
  (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}><path d="M12 2L2 12l10 10 10-10L12 2z" /></svg>, // Diamond
  (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}><path d="M12 2L2 22h20L12 2z" /></svg>, // Triangle
  (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}><circle cx="12" cy="12" r="10" /></svg>, // Circle
  (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}><path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" /></svg>, // Hexagon
  (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}><path d="M12 2v20M2 12h20" /></svg>, // Plus
  (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}><rect x="3" y="3" width="18" height="18" rx="2" /></svg>, // Square
  (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" /></svg>, // Orbital
];

const CARDS_PER_ROW = 10;
const CARD_SIZE = 200;
const CARD_GAP = 24;

export function AnimatedCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none perspective-[1000px]">
      <motion.div 
        style={{ x: parallaxX, y: parallaxY }} 
        className="w-[200%] h-full flex flex-col justify-center gap-6 absolute top-1/2 -translate-y-1/2 left-[-50%] opacity-40 rotate-[-10deg] scale-125"
      >
        <CardRow direction={1} />
        <CardRow direction={-1} />
      </motion.div>
    </div>
  );
}

function CardRow({ direction }: { direction: number }) {
  const baseVelocity = -1 * direction;
  const baseX = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 20);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => {
    const wrapWidth = (CARD_SIZE + CARD_GAP) * CARDS_PER_ROW;
    const wrapped = ((v % wrapWidth) + wrapWidth) % wrapWidth;
    return -wrapped;
  });

  return (
    <motion.div style={{ x }} className="flex gap-6 whitespace-nowrap will-change-transform">
      {[...Array(2)].map((_, groupIdx) => (
        <div key={groupIdx} className="flex gap-6">
          {[...Array(CARDS_PER_ROW)].map((_, i) => {
            const Shape = SHAPES[i % SHAPES.length];
            const isDark = i % 2 === 0;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.05 }}
                className={`
                  relative shrink-0 flex items-center justify-center 
                  w-[200px] h-[200px] rounded-3xl backdrop-blur-md 
                  border border-white/[0.08] shadow-2xl pointer-events-auto cursor-pointer group
                  ${isDark ? 'bg-white/[0.02]' : 'bg-white/[0.04]'}
                `}
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10 + (i % 5), repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 text-white/30 group-hover:text-white/60 transition-colors duration-500"
                >
                  <Shape />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      ))}
    </motion.div>
  );
}
