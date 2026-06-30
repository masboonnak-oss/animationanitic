import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#050510]" />
      
      {/* Deep Blue Blob */}
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-[#0a0a2e] blur-[120px] opacity-25"
      />

      {/* Purple Blob */}
      <motion.div
        animate={{
          x: [0, -150, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#1a0a3e] blur-[120px] opacity-25"
      />

      {/* Cyan/Neon Blob */}
      <motion.div
        animate={{
          x: [0, 50, -150, 0],
          y: [0, 150, -100, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute bottom-[-20%] left-[20%] w-[900px] h-[900px] rounded-full bg-[#0a1a3e] blur-[120px] opacity-20"
      />
    </div>
  );
}
