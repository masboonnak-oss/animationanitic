import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { CreditCard, Shield, Globe, Zap, BarChart3, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function Payment() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a3e]/50 via-transparent to-[#1a0a3e]/30" />
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 text-sm text-muted-foreground">
            <CreditCard className="w-4 h-4" />
            <span>Payment Gateway</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight mb-8 leading-[1.05]">
            Move Money at<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)]">Enterprise Scale</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">Accept payments from 180+ countries. Instant settlement, enterprise fraud detection, and 99.99% uptime — all under your sovereign control.</p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/register"><button className="rounded-full px-8 h-12 bg-white text-black font-medium hover:bg-gray-200 transition-all flex items-center space-x-2"><span>Start Accepting Payments</span><ArrowRight className="w-4 h-4"/></button></Link>
            <Link href="/contact"><button className="rounded-full px-8 h-12 border border-white/20 text-white font-medium hover:bg-white/5 transition-all">Talk to Sales</button></Link>
          </div>
        </motion.div>
      </section>

      {/* Volume Stats */}
      <section className="py-16 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "$2.4B+", label: "Annual Volume" },
            { value: "180+", label: "Countries" },
            { value: "99.99%", label: "Uptime" },
            { value: "<200ms", label: "Avg. Latency" },
          ].map((s, i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
              <div className="text-4xl font-display font-bold mb-2" style={{textShadow:"0 0 20px var(--neon-blue)"}}>{s.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Built for Enterprises</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need to run payments at scale — with the security and compliance enterprises demand.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "Fraud Detection AI", desc: "Real-time ML-powered fraud scoring analyzes 200+ signals per transaction to block threats before they hit your account." },
            { icon: Globe, title: "Global Acquiring", desc: "Local acquiring in 45+ countries optimizes authorization rates and reduces cross-border fees by up to 40%." },
            { icon: Zap, title: "Instant Settlement", desc: "Receive funds in your account within hours, not days. Real-time balance visibility with sub-second webhook delivery." },
            { icon: BarChart3, title: "Revenue Analytics", desc: "Deep insights into payment performance, churn prediction, revenue forecasting, and optimization recommendations." },
            { icon: Lock, title: "PCI-DSS Level 1", desc: "Fully compliant with the highest PCI-DSS certification. Your customers' data is protected by military-grade encryption." },
            { icon: CreditCard, title: "All Payment Methods", desc: "Cards, wallets, bank transfers, BNPL, crypto — accept every payment method your customers prefer." },
          ].map((f, i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} whileHover={{y:-6}} className="p-8 rounded-3xl bg-[#161616] border border-white/5 hover:border-[var(--neon-blue)]/20 transition-all group">
              <f.icon className="w-10 h-10 mb-6 text-white/30 group-hover:text-[var(--neon-blue)] transition-colors" />
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}