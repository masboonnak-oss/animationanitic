import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Database, Zap, Thermometer, Shield, Network, Eye, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "wouter";

const RACKS = [
  { name: "Quarter Rack", u: "10U", power: "2kW", network: "1Gbps", ipv4: "/29 (6 usable)", price: 299 },
  { name: "Half Rack", u: "21U", power: "5kW", network: "1Gbps", ipv4: "/28 (14 usable)", price: 549, popular: true },
  { name: "Full Rack", u: "42U", power: "10kW", network: "10Gbps", ipv4: "/27 (30 usable)", price: 999 },
  { name: "Private Suite", u: "Custom", power: "Custom", network: "100Gbps", ipv4: "/24 Block", price: null },
];

export default function Colocation() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      <section className="pt-36 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001a0a]/40 via-transparent to-transparent" />
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 text-sm text-muted-foreground">
            <Database className="w-4 h-4 text-[var(--neon-cyan)]" />
            <span>Global Colocation</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.05]">
            Your Hardware.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-blue)]">Our Infrastructure.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">House your enterprise hardware in Tier IV data centers. Direct cross-connects to major cloud providers, peering exchanges, and 120Tbps+ network backbone.</p>
          <Link href="/contact"><button className="rounded-full px-8 h-12 bg-white text-black font-medium hover:bg-gray-200 transition-all flex items-center space-x-2 mx-auto"><span>Get a Custom Quote</span><ArrowRight className="w-4 h-4"/></button></Link>
        </motion.div>
      </section>

      {/* Rack options */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Colocation Options</h2>
          <p className="text-muted-foreground">All plans include 24/7 remote hands, biometric access, and carrier-neutral connectivity.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RACKS.map((rack, i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} whileHover={{y:-4}} className={`relative p-8 rounded-3xl border transition-all ${rack.popular ? 'bg-white/5 border-[var(--neon-cyan)]/30 shadow-[0_0_40px_rgba(0,255,204,0.06)]' : 'bg-[#161616] border-white/5 hover:border-white/15'}`}>
              {rack.popular && <div className="absolute -top-3 left-6 text-[10px] font-bold px-3 py-1 rounded-full bg-[var(--neon-cyan)] text-black uppercase tracking-widest">Most Popular</div>}
              <h3 className="text-xl font-bold mb-1">{rack.name}</h3>
              <div className="text-3xl font-bold mb-6">{rack.price ? <>${rack.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></> : <span className="text-2xl">Custom</span>}</div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[var(--neon-cyan)] flex-shrink-0"/>{rack.u} rack space</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[var(--neon-cyan)] flex-shrink-0"/>{rack.power} redundant power</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[var(--neon-cyan)] flex-shrink-0"/>{rack.network} uplink</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[var(--neon-cyan)] flex-shrink-0"/>{rack.ipv4} IPv4</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[var(--neon-cyan)] flex-shrink-0"/>24/7 remote hands</li>
              </ul>
              <Link href="/contact"><button className={`mt-6 w-full h-9 rounded-xl text-sm font-medium transition-all ${rack.popular ? 'bg-[var(--neon-cyan)] text-black hover:opacity-90' : 'bg-white/10 hover:bg-white/20'}`}>Request Quote</button></Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Included features */}
      <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Everything Included</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Physical Security", desc: "Biometric access, 24/7 CCTV, armed security, and mantrap entry for all facilities." },
              { icon: Thermometer, title: "Precision Cooling", desc: "N+1 cooling with hot/cold aisle containment. PUE < 1.3 across all facilities." },
              { icon: Zap, title: "Redundant Power", desc: "2N power infrastructure with UPS and diesel generator backup. 99.999% power uptime." },
              { icon: Network, title: "Carrier Neutral", desc: "Direct cross-connects to 200+ carriers. Peering with major IXPs in every location." },
              { icon: Eye, title: "Remote Hands", desc: "24/7 expert technical staff for hardware installations, reboots, and diagnostics." },
              { icon: Database, title: "100% Renewable", desc: "All colocation facilities run on 100% renewable energy with carbon offset certificates." },
            ].map((f, i) => (
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="flex gap-4 p-6 rounded-2xl hover:bg-white/5 transition-colors">
                <f.icon className="w-6 h-6 text-[var(--neon-cyan)] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}