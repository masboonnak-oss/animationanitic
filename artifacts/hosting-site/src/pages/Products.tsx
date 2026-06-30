import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Server, Cpu, HardDrive, Network, Zap, Shield, Globe, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { getProducts, type ProductPlan } from "@/lib/admin-store";

const FEATURES = [
  { icon: Zap, title: "Instant Deploy", desc: "Live in under 60 seconds. AMD EPYC processors with dedicated vCPU." },
  { icon: HardDrive, title: "NVMe SSD Only", desc: "All instances use enterprise NVMe - up to 10x faster than SATA SSDs." },
  { icon: Shield, title: "DDoS Protected", desc: "120Tbps always-on protection included at no extra charge on every VPS." },
  { icon: Globe, title: "18 Regions", desc: "Deploy in Singapore, Frankfurt, New York, Tokyo, London, and 13 more." },
];

export default function Products() {
  const [plans, setPlans] = useState<ProductPlan[]>(() => getProducts().filter((product) => product.active));

  useEffect(() => {
    const syncProducts = () => setPlans(getProducts().filter((product) => product.active));
    window.addEventListener("sovereign-admin-store", syncProducts);
    window.addEventListener("storage", syncProducts);
    return () => {
      window.removeEventListener("sovereign-admin-store", syncProducts);
      window.removeEventListener("storage", syncProducts);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-4 pb-16 pt-32 text-center sm:px-6 sm:pb-20 sm:pt-36">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a2e]/60 via-transparent to-transparent" />
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 text-sm text-muted-foreground">
            <Server className="w-4 h-4 text-[var(--neon-blue)]" />
            <span>Cloud VPS - Sovereign Hosting</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl md:text-7xl">
            Cloud VPS<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)]">Engineered to Scale</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base text-muted-foreground sm:text-xl">High-performance virtual instances with dedicated AMD EPYC vCPU, NVMe storage, and 120Tbps DDoS protection in 18 global locations.</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/register"><button className="flex h-12 min-w-44 items-center justify-center space-x-2 rounded-full bg-white px-8 font-medium text-black transition-all hover:bg-gray-200"><span>Deploy Now</span><ArrowRight className="w-4 h-4"/></button></Link>
            <Link href="/dedicated"><button className="h-12 min-w-44 rounded-full border border-white/20 px-8 font-medium text-white transition-all hover:bg-white/5">View Dedicated</button></Link>
          </div>
        </motion.div>
      </section>

      {/* Features row */}
      <section className="border-y border-white/5 bg-[#0a0a0a] py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-6">
          {FEATURES.map((f, i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/5 transition-colors">
              <f.icon className="w-8 h-8 mb-3 text-[var(--neon-blue)]" />
              <h3 className="font-bold mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Plans grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Choose Your Instance</h2>
          <p className="text-muted-foreground">All plans include NVMe SSD, DDoS protection, snapshots, and 24/7 support.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, i) => (
            <motion.div key={plan.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.06}} whileHover={{y:-4,scale:1.02}} className={`relative p-6 rounded-2xl border transition-all cursor-pointer ${plan.badge === 'Popular' ? 'bg-white/5 border-[var(--neon-blue)]/30 shadow-[0_0_30px_rgba(0,212,255,0.08)]' : 'bg-[#161616] border-white/5 hover:border-white/15'}`}>
              {plan.badge && <div className={`absolute -top-3 left-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${plan.badge === 'Popular' ? 'bg-[var(--neon-blue)] text-black' : 'bg-white text-black'}`}>{plan.badge}</div>}
              <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
              <p className="mb-4 min-h-10 text-xs leading-relaxed text-muted-foreground">{plan.description}</p>
              <div className="text-3xl font-bold mb-4">${plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-center gap-2"><Cpu className="w-3.5 h-3.5 text-white/40"/>{plan.vcpu} vCPU</li>
                <li className="flex items-center gap-2"><Server className="w-3.5 h-3.5 text-white/40"/>{plan.ram}GB RAM</li>
                <li className="flex items-center gap-2"><HardDrive className="w-3.5 h-3.5 text-white/40"/>{plan.storage}GB NVMe</li>
                <li className="flex items-center gap-2"><Network className="w-3.5 h-3.5 text-white/40"/>{plan.bandwidth}TB Bandwidth</li>
              </ul>
              <Link href="/register"><button className={`w-full h-9 rounded-xl text-sm font-medium transition-all ${plan.badge === 'Popular' ? 'bg-[var(--neon-blue)] text-black hover:opacity-90' : 'bg-white/10 hover:bg-white/20'}`}>Deploy</button></Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
