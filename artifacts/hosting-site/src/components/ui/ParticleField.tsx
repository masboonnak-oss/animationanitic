import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 60; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 4 + 4,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <ParticleNode key={p.id} particle={p} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
}

function ParticleNode({ particle, mouseX, mouseY }: { particle: Particle; mouseX: any; mouseY: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    let animationFrameId: number;
    
    const updatePosition = () => {
      const mx = mouseX.get();
      const my = mouseY.get();
      
      // We would ideally calculate distance from actual px position, but we simplify
      // For performance in this mock, we just let them drift.
      
      animationFrameId = requestAnimationFrame(updatePosition);
    };
    
    updatePosition();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="absolute bg-white rounded-full"
      style={{
        width: particle.size,
        height: particle.size,
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        opacity: 0.15 + Math.random() * 0.15,
      }}
      animate={{
        x: [0, Math.random() * 60 - 30, 0],
        y: [0, Math.random() * 60 - 30, 0],
      }}
      transition={{
        duration: particle.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
