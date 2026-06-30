import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Home, Server, CreditCard, Brain, Database, Building2, LogIn, LayoutDashboard, LifeBuoy, Mail, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Server, label: "Hosting", href: "/products" },
  { icon: CreditCard, label: "Payment", href: "/payment" },
  { icon: Brain, label: "AI Platform", href: "/ai" },
  { icon: Database, label: "Data Center", href: "/datacenter" },
  { icon: Building2, label: "Orgs", href: "/organizations" },
  { icon: LogIn, label: "Login", href: "/login" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: LifeBuoy, label: "Support", href: "/status" },
  { icon: Mail, label: "Contact", href: "/contact" },
];

export function CircularNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [_, setLocation] = useLocation();
  const radius = 155;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9990]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed top-6 right-6 z-[9995] flex items-center justify-center w-12 h-12">
        <AnimatePresence>
          {isOpen && NAV_ITEMS.map((item, index) => {
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
                onClick={() => { setLocation(item.href); setIsOpen(false); }}
                className="absolute flex flex-col items-center justify-center w-16 h-16 rounded-full bg-black/50 border border-white/10 hover:border-[#00d4ff]/50 backdrop-blur-xl group cursor-pointer text-white"
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