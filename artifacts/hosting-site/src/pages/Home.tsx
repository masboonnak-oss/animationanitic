import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { Server, Shield, Globe, Cpu, Database, Cloud as CloudIcon } from "lucide-react";
import { AnimatedCards } from "@/components/ui/AnimatedCards";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ParticleField } from "@/components/ui/ParticleField";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const [_, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#111111] text-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <AuroraBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/10 via-[#111111]/60 to-[#0a0a0a] z-0" />
        <ParticleField />
        <AnimatedCards />
        
        <div className="relative z-10 text-center max-w-5xl px-6 pt-20 pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1]"
          >
            Enterprise Cloud <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Infrastructure</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md"
          >
            Deploy enterprise VPS, Dedicated Servers, GPU Servers and Cloud Solutions worldwide. Engineered for performance, built for scale.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex items-center justify-center space-x-6 pointer-events-auto"
          >
            <MagneticButton onClick={() => setLocation("/register")}>
              <div className="flex items-center justify-center rounded-full px-10 text-lg h-14 bg-white text-black font-medium hover:bg-gray-200 transition-all cursor-pointer">Start Now</div>
            </MagneticButton>
            <MagneticButton onClick={() => setLocation("/about")}>
              <div className="flex items-center justify-center rounded-full px-10 text-lg h-14 border border-white/20 bg-black/20 backdrop-blur-sm text-white font-medium hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer">Pricing</div>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-white/5 bg-[#0a0a0a] relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Uptime SLA", value: "99.99%" },
            { label: "DDoS Protection", value: "120Tbps" },
            { label: "Global Locations", value: "18" },
            { label: "Active Servers", value: "5000+" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="text-center relative"
            >
              <div className="absolute inset-0 bg-[var(--neon-blue)] opacity-5 blur-[60px] rounded-full" />
              <motion.div 
                className="text-5xl md:text-6xl font-display font-bold mb-4 tracking-tighter"
                style={{ textShadow: "0 0 20px var(--neon-blue)" }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground uppercase tracking-[0.2em] font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-32 max-w-7xl mx-auto px-6 relative z-20">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Uncompromising Power</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">Build your infrastructure with our suite of enterprise-grade compute products.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Cloud VPS", icon: Server, desc: "High-performance virtual instances with dedicated NVMe storage and guaranteed CPU resources." },
            { title: "Dedicated Servers", icon: Cpu, desc: "Single-tenant bare metal servers for maximum performance, isolation, and control." },
            { title: "Global Network", icon: Globe, desc: "Redundant Anycast network with premium transit blend and built-in edge protection." },
            { title: "Block Storage", icon: Database, desc: "Highly available replicated NVMe storage volumes that attach instantly to your instances." },
            { title: "GPU Instances", icon: Shield, desc: "Accelerated computing powered by the latest NVIDIA architectures for AI and ML workloads." },
            { title: "Managed Kubernetes", icon: CloudIcon, desc: "Production-ready clusters deployed in minutes with automated scaling and lifecycle management." }
          ].map((prod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-[1px] rounded-3xl cursor-pointer group relative overflow-hidden bg-white/5 hover:bg-white/10"
            >
              <motion.div
                className="absolute inset-[-100%] z-0 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{
                  background: "conic-gradient(from 0deg, transparent, transparent, transparent, var(--neon-cyan), var(--neon-blue), transparent)",
                  opacity: 0,
                }}
                whileHover={{ opacity: 0.5 }}
              />
              <div className="relative z-10 h-full p-10 rounded-[23px] bg-[#161616] border border-white/5 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <prod.icon className="w-12 h-12 mb-8 text-white/40 group-hover:text-[var(--neon-blue)] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]" />
                <h3 className="text-2xl font-bold mb-4">{prod.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{prod.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-[#0a0a0a] relative z-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">Predictable billing with no hidden fees or bandwidth overage surprises.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Starter", price: 10, desc: "Perfect for staging and small applications.", features: ["2 vCPU", "4GB RAM", "50GB NVMe", "1TB Bandwidth"] },
              { name: "Pro", price: 40, desc: "High performance for production workloads.", features: ["4 vCPU", "16GB RAM", "200GB NVMe", "4TB Bandwidth"], popular: true },
              { name: "Enterprise", price: 120, desc: "Dedicated resources for intensive applications.", features: ["8 vCPU Dedicated", "32GB RAM", "500GB NVMe", "10TB Bandwidth"] }
            ].map((tier, i) => (
              <div key={i} className={`p-10 rounded-3xl relative border ${tier.popular ? 'bg-white/5 border-white/20 scale-105 shadow-[0_0_50px_rgba(0,212,255,0.1)]' : 'bg-[#161616] border-white/5'} overflow-hidden group`}>
                {tier.popular && (
                  <>
                    <motion.div
                      className="absolute inset-[-100%] z-0 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      style={{
                        background: "conic-gradient(from 0deg, transparent, transparent, transparent, var(--neon-purple), var(--neon-blue), transparent)",
                        opacity: 0.3,
                      }}
                    />
                    <div className="absolute inset-[1px] bg-[#161616] rounded-[23px] z-0" />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest z-20 shadow-[0_0_15px_rgba(255,255,255,0.5)]">Most Popular</div>
                  </>
                )}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-8 min-h-[40px]">{tier.desc}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-display font-bold">${tier.price}</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-center text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full mr-3 ${tier.popular ? 'bg-[var(--neon-blue)] shadow-[0_0_8px_var(--neon-blue)]' : 'bg-white opacity-60'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full h-12 rounded-xl font-medium ${tier.popular ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/10 hover:bg-white/20'}`}>
                    Deploy Instance
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}