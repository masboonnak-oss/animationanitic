import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Shield, Globe, Zap, Users } from "lucide-react";

const TEAM = [
  { name: "Sovereign Technologies", role: "Enterprise Technology Group", desc: "Building the infrastructure layer for the next generation of digital economies." },
];

const VALUES = [
  { icon: Shield, title: "Sovereign by Design", desc: "We believe enterprises should own their infrastructure, data, and payment rails — not rent them at the mercy of hyperscalers." },
  { icon: Globe, title: "Globally Present", desc: "18 data center locations across 6 continents. We go where your customers are, ensuring sub-30ms latency anywhere on Earth." },
  { icon: Zap, title: "Relentlessly Fast", desc: "From provisioning (60s) to payments (200ms) to support response (< 2min) — speed is embedded in everything we build." },
  { icon: Users, title: "Enterprise First", desc: "Every product decision is made for CTOs, infrastructure engineers, and CFOs — the people who actually run the systems." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      <section className="pt-36 pb-24 px-6 text-center">
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.9}} className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.05]">
            Built for the<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 via-white to-white/50">Bold & Sovereign</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Sovereign Engine QECF was founded on a simple premise: enterprises deserve infrastructure, payments, and intelligence that works for them — not against them.
          </p>
        </motion.div>
      </section>

      <section className="py-20 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "2019", label: "Founded" },
            { value: "18", label: "Global Locations" },
            { value: "12K+", label: "Enterprise Clients" },
            { value: "$2.4B+", label: "Payment Volume" },
          ].map((s, i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
              <div className="text-5xl font-display font-bold mb-2" style={{textShadow:"0 0 20px rgba(255,255,255,0.2)"}}>{s.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-display font-bold mb-6">Our Values</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">The principles that guide every product decision, every infrastructure investment, every hire.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {VALUES.map((v, i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.12}} className="p-10 rounded-3xl bg-[#161616] border border-white/5 hover:border-white/10 transition-all group">
              <v.icon className="w-10 h-10 mb-6 text-white/30 group-hover:text-white/70 transition-colors" />
              <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Join the sovereign infrastructure movement.</h2>
          <p className="text-xl text-muted-foreground mb-10">We're hiring engineers, architects, and operators who believe enterprise infrastructure should be excellent.</p>
          <a href="mailto:careers@sovereign.io" className="inline-flex items-center rounded-full px-8 h-12 bg-white text-black font-medium hover:bg-gray-200 transition-all">View Open Roles</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}