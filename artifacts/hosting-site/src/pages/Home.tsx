import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Server, Globe, Database, CreditCard, Brain, Building2 } from "lucide-react";
import { AnimatedCards } from "@/components/ui/AnimatedCards";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ParticleField } from "@/components/ui/ParticleField";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LogoDecor } from "@/components/ui/LogoDecor";
import { getProducts, type ProductPlan } from "@/lib/admin-store";

export default function Home() {
  const [_, setLocation] = useLocation();
  const [pricingPlans, setPricingPlans] = useState<ProductPlan[]>(() => getProducts().filter((product) => product.active).slice(0, 3));

  useEffect(() => {
    const syncProducts = () => setPricingPlans(getProducts().filter((product) => product.active).slice(0, 3));
    window.addEventListener("sovereign-admin-store", syncProducts);
    window.addEventListener("storage", syncProducts);
    return () => {
      window.removeEventListener("sovereign-admin-store", syncProducts);
      window.removeEventListener("storage", syncProducts);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] text-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-28 sm:px-6">
        <AuroraBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/10 via-[#111111]/60 to-[#0a0a0a] z-0" />
        <LogoDecor className="left-1/2 top-1/2 z-[1] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-70" glowClassName="bg-[var(--neon-blue)]/10" />
        <LogoDecor className="-left-28 bottom-8 z-[1] h-72 w-72 rotate-[-18deg] opacity-35" glowClassName="bg-[var(--neon-purple)]/10" />
        <ParticleField />
        <AnimatedCards />
        
        <div className="relative z-10 max-w-5xl text-center pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-7 text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl md:text-8xl"
          >
            Sovereign Infrastructure <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">for the Digital Age</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mb-10 max-w-3xl text-base font-light leading-relaxed text-muted-foreground drop-shadow-md sm:text-xl md:text-2xl"
          >
            Payment gateways, enterprise hosting, AI intelligence, and data center solutions - unified under one sovereign platform.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center gap-4 pointer-events-auto sm:flex-row sm:gap-6"
          >
            <MagneticButton onClick={() => setLocation("/register")}>
              <div className="flex h-14 min-w-44 items-center justify-center rounded-full bg-white px-10 text-base font-medium text-black transition-all hover:bg-gray-200 sm:text-lg">Start Now</div>
            </MagneticButton>
            <MagneticButton onClick={() => setLocation("/products")}>
              <div className="flex h-14 min-w-44 items-center justify-center rounded-full border border-white/20 bg-black/20 px-10 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 sm:text-lg">Pricing</div>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-white/5 bg-[#0a0a0a] relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Uptime SLA", value: "99.99%" },
            { label: "Payment Volume", value: "$2.4B+" },
            { label: "Global Locations", value: "18" },
            { label: "Active Clients", value: "12,000+" },
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
            { title: "Payment Gateway", icon: CreditCard, desc: "Accept global payments with enterprise-grade security, instant settlement, and 99.99% uptime SLA. Multi-currency, fraud detection built-in.", href: "/payment" },
            { title: "Cloud Hosting", icon: Server, desc: "High-performance VPS, Dedicated Servers, and Kubernetes clusters in 18 regions worldwide. NVMe storage, 120Tbps DDoS protection.", href: "/products" },
            { title: "AI Platform", icon: Brain, desc: "Sovereign AI - intelligent automation, smart analytics, and an embedded AI assistant that learns your business workflows.", href: "/ai" },
            { title: "Data Centers", icon: Database, desc: "Tier IV certified data centers with colocation, private suites, and cross-connect. 100% renewable energy. 18 global points of presence.", href: "/datacenter" },
            { title: "Organization Management", icon: Building2, desc: "Role-based access control, multi-team workspaces, SSO, audit logs, and compliance tooling for enterprise organizations.", href: "/organizations" },
            { title: "Global Network", icon: Globe, desc: "Redundant Anycast backbone with 120Tbps+ DDoS mitigation, premium transit blend, and sub-millisecond regional failover.", href: "/cloud" },
          ].map((prod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setLocation(prod.href)}
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
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">Predictable billing with no hidden fees or bandwidth overage surprises.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((tier, i) => {
              const popular = tier.badge.toLowerCase() === "popular" || i === 1;
              const features = [`${tier.vcpu} vCPU`, `${tier.ram}GB RAM`, `${tier.storage}GB NVMe`, `${tier.bandwidth}TB Bandwidth`];

              return (
              <div key={tier.id} className={`p-10 rounded-3xl relative border ${popular ? 'bg-white/5 border-white/20 scale-105 shadow-[0_0_50px_rgba(0,212,255,0.1)]' : 'bg-[#161616] border-white/5'} overflow-hidden group`}>
                {popular && (
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
                  <p className="text-sm text-muted-foreground mb-8 min-h-[40px]">{tier.description}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-display font-bold">${tier.price}</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {features.map((f, j) => (
                      <li key={j} className="flex items-center text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full mr-3 ${popular ? 'bg-[var(--neon-blue)] shadow-[0_0_8px_var(--neon-blue)]' : 'bg-white opacity-60'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => setLocation("/register")} className={`w-full h-12 rounded-xl font-medium ${popular ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/10 hover:bg-white/20'}`}>
                    Deploy Instance
                  </Button>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
