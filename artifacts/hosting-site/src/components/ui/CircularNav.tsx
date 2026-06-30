import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowUpRight, Orbit, Home, Server, CreditCard, Brain, Database, Building2, LogIn, LayoutDashboard, LifeBuoy, Mail, Menu, X } from "lucide-react";
import { LogoDecor } from "@/components/ui/LogoDecor";

const NAV_ITEMS = [
  { icon: Orbit, label: "Orbit", href: "/", summary: "Immersive rotating circular page navigator (home).", accent: "#9b59ff", shapes: ["triangle", "square", "line"] },
  { icon: Home, label: "Home", href: "/home", summary: "The main platform overview page.", accent: "#ffffff", shapes: ["square", "triangle", "line"] },
  { icon: Server, label: "Hosting", href: "/products", summary: "Cloud VPS, dedicated compute, and scalable infrastructure plans.", accent: "#00d4ff", shapes: ["triangle", "square", "line"] },
  { icon: CreditCard, label: "Payment", href: "/payment", summary: "Payment gateway, settlement, fraud control, and billing demo.", accent: "#00ffcc", shapes: ["square", "line", "triangle"] },
  { icon: Brain, label: "AI Platform", href: "/ai", summary: "Automation, insight, and assistant workflows for teams.", accent: "#9b59ff", shapes: ["triangle", "line", "square"] },
  { icon: Database, label: "Data Center", href: "/datacenter", summary: "Facility, rack, colocation, and private suite capabilities.", accent: "#36a3ff", shapes: ["square", "square", "triangle"] },
  { icon: Building2, label: "Orgs", href: "/organizations", summary: "Teams, roles, access control, and enterprise workspaces.", accent: "#ffc857", shapes: ["line", "square", "triangle"] },
  { icon: LogIn, label: "Login", href: "/login", summary: "Sign in to the demo account experience.", accent: "#ffffff", shapes: ["triangle", "line", "square"] },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", summary: "Preview the operational dashboard surface.", accent: "#7cffcb", shapes: ["square", "line", "line"] },
  { icon: LifeBuoy, label: "Support", href: "/status", summary: "Status, incidents, support, and service health.", accent: "#ff7a90", shapes: ["line", "triangle", "square"] },
  { icon: Mail, label: "Contact", href: "/contact", summary: "Sales, support, and custom infrastructure requests.", accent: "#ffb86b", shapes: ["square", "triangle", "triangle"] },
];

export function CircularNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<(typeof NAV_ITEMS)[number] | null>(null);
  const [activeVector, setActiveVector] = useState({ x: 0, y: 0, rotate: 0 });
  const [location, setLocation] = useLocation();
  const [radius, setRadius] = useState(155);
  const closeMenu = () => {
    setActiveItem(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const syncRadius = () => {
      setRadius(window.innerWidth < 640 ? 104 : 155);
    };

    syncRadius();
    window.addEventListener("resize", syncRadius);
    return () => window.removeEventListener("resize", syncRadius);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence>
        {(isOpen || activeItem) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9990]"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-[9994] flex items-center justify-center px-3 py-6 pointer-events-none sm:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{
                x: activeVector.x,
                y: activeVector.y,
                rotate: activeVector.rotate,
                rotateX: -18,
                rotateY: 16,
                scale: 0.16,
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                rotate: 0,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                opacity: 1,
              }}
              exit={{
                x: activeVector.x,
                y: activeVector.y,
                rotate: activeVector.rotate,
                rotateX: 16,
                rotateY: -14,
                scale: 0.16,
                opacity: 0,
              }}
              transition={{
                duration: 0.62,
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.28, ease: "linear" },
              }}
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "80% 12%",
                willChange: "transform, opacity",
              }}
              className="relative max-h-[88svh] w-full max-w-xl overflow-y-auto overflow-x-hidden border border-white/15 bg-[#f4f0e8] text-black shadow-[0_30px_120px_rgba(0,0,0,0.65)] pointer-events-auto"
            >
              <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(90deg,rgba(0,0,0,0.18)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.16)_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div
                className="absolute -right-20 -top-24 h-56 w-56 rotate-45"
                style={{ backgroundColor: activeItem.accent, opacity: 0.16 }}
              />
              <LogoDecor className="-right-14 top-24 h-56 w-56 opacity-80" glowClassName="bg-black/0" />
              <div
                className="absolute bottom-8 left-8 h-0 w-0 border-l-[58px] border-r-[58px] border-b-[96px] border-l-transparent border-r-transparent"
                style={{ borderBottomColor: activeItem.accent, opacity: 0.22 }}
              />
              <div className="absolute bottom-0 right-0 h-24 w-44 border-l border-t border-black/10 bg-black/[0.04]" />

              <div className="relative z-10 p-5 sm:p-9">
                <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8 sm:gap-6">
                  <div>
                    <div className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.32em] text-black/50">
                      <span className="h-px w-10 bg-black/30" />
                      Category paper
                    </div>
                    <h2 className="text-3xl font-black tracking-tight sm:text-5xl">{activeItem.label}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveItem(null)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center border border-black/15 bg-white/60 text-black transition-colors hover:bg-white"
                    aria-label="Close category paper"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="max-w-md text-base leading-7 text-black/68">{activeItem.summary}</p>

                <div className="mt-7 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
                  {activeItem.shapes.map((shape, index) => (
                    <div key={`${shape}-${index}`} className="relative h-20 overflow-hidden border border-black/10 bg-white/45 sm:h-24">
                      {shape === "triangle" && (
                        <div
                          className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 border-l-[28px] border-r-[28px] border-b-[48px] border-l-transparent border-r-transparent"
                          style={{ borderBottomColor: activeItem.accent }}
                        />
                      )}
                      {shape === "square" && (
                        <div
                          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rotate-45"
                          style={{ backgroundColor: activeItem.accent }}
                        />
                      )}
                      {shape === "line" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-[2px] w-16 rotate-[-28deg]" style={{ backgroundColor: activeItem.accent }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setLocation(activeItem.href);
                      closeMenu();
                    }}
                    className="inline-flex h-12 items-center justify-center gap-2 bg-black px-6 text-sm font-bold uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5"
                  >
                    Open page
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveItem(null)}
                    className="h-12 border border-black/15 bg-white/55 px-6 text-sm font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-white"
                  >
                    Close paper
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`fixed right-4 z-[9995] flex h-12 w-12 items-center justify-center sm:right-6 ${location === "/login" || location === "/register" ? "top-6" : "top-20"}`}>
        <AnimatePresence>
          {isOpen && !activeItem && NAV_ITEMS.map((item, index) => {
            const angle = (index * (360 / NAV_ITEMS.length) * Math.PI) / 180;
            const x = -Math.sin(angle) * radius;
            const y = Math.cos(angle) * radius;
            return (
              <motion.button
                key={item.href + item.label}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={{ opacity: 1, x, y, scale: 1 }}
                exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.03 }}
                whileHover={{ scale: 1.15 }}
                onClick={() => {
                  setActiveItem(item);
                  setActiveVector({ x, y, rotate: (index - NAV_ITEMS.length / 2) * 8 });
                }}
                className="absolute flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/55 border border-white/10 hover:border-[#00d4ff]/50 backdrop-blur-xl group cursor-pointer text-white shadow-[0_18px_50px_rgba(0,0,0,0.32)]"
              >
                <item.icon className="w-5 h-5 mb-1 text-white/70 group-hover:text-[#00d4ff] transition-colors" />
                <span className="text-[9px] font-medium opacity-0 group-hover:opacity-100 absolute -bottom-6 transition-opacity whitespace-nowrap tracking-wide">{item.label}</span>
                <div className="absolute inset-0 rounded-full bg-[#00d4ff]/0 group-hover:bg-[#00d4ff]/10 transition-colors" />
              </motion.button>
            );
          })}
        </AnimatePresence>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full border border-white"
              animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      </div>
    </>
  );
}
