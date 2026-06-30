import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Database, MapPin, Zap, Shield, Thermometer, Network, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const LOCATIONS = [
  { city: "Singapore", region: "Asia Pacific", tier: "Tier IV", power: "99.999%" },
  { city: "Frankfurt", region: "Europe", tier: "Tier IV", power: "99.999%" },
  { city: "New York", region: "North America", tier: "Tier III+", power: "99.99%" },
  { city: "London", region: "Europe", tier: "Tier IV", power: "99.999%" },
  { city: "Tokyo", region: "Asia Pacific", tier: "Tier IV", power: "99.999%" },
  { city: "São Paulo", region: "South America", tier: "Tier III+", power: "99.99%" },
];

export default function DataCenter() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a0a]/40 via-transparent to-transparent" />
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 text-sm text-muted-foreground">
            <Database className="w-4 h-4 text-[var(--neon-cyan)]" />
            <span>Global Data Centers</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight mb-8 leading-[1.05]">
            Your Data.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-blue)]">Your Territory.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">Tier IV certified data centers across 18 global locations. Colocation, private suites, and cross-connect for enterprises that demand absolute control.</p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/contact"><button className="rounded-full px-8 h-12 bg-white text-black font-medium hover:bg-gray-200 transition-all flex items-center space-x-2"><span>Request a Tour</span><ArrowRight className="w-4 h-4"/></button></Link>
          </div>
        </motion.div>
      </section>

      {/* Specs */}
      <section className="py-16 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "18", label: "Global POPs" },
            { value: "Tier IV", label: "Certification" },
            { value: "100%", label: "Renewable Energy" },
            { value: "120Tbps", label: "Network Capacity" },
          ].map((s, i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
              <div className="text-4xl font-display font-bold mb-2" style={{textShadow:"0 0 20px var(--neon-cyan)"}}>{s.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Premium Locations</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Strategic presence in the world's most critical network hubs.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCATIONS.map((loc, i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} whileHover={{y:-4}} className="p-8 rounded-3xl bg-[#161616] border border-white/5 hover:border-[var(--neon-cyan)]/20 transition-all group">
              <div className="flex items-start justify-between mb-6">
                <MapPin className="w-6 h-6 text-[var(--neon-cyan)] group-hover:scale-110 transition-transform" />
                <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-muted-foreground">{loc.tier}</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{loc.city}</h3>
              <p className="text-muted-foreground text-sm mb-4">{loc.region}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Zap className="w-3 h-3 text-[var(--neon-cyan)]" />
                <span>{loc.power} power uptime</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Colocation Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">From single U to private cages — scale at your pace.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Database, title: "Half Rack", desc: "21U of space with 5kW power and 1Gbps connectivity." },
              { icon: Network, title: "Full Rack", desc: "42U with 10kW power and 10Gbps uplink included." },
              { icon: Shield, title: "Private Suite", desc: "Dedicated caged space with biometric access control." },
              { icon: Thermometer, title: "Custom Build", desc: "Design your own footprint with our infrastructure team." },
            ].map((f, i) => (
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="p-6 rounded-2xl bg-[#161616] border border-white/5 text-center group hover:border-[var(--neon-cyan)]/20 transition-all">
                <f.icon className="w-8 h-8 mx-auto mb-4 text-[var(--neon-cyan)]" />
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}