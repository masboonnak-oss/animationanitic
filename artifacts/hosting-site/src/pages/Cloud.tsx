import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Cloud as CloudIcon, Layers, Link2, Settings, Shield, Zap, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const SOLUTIONS = [
  { title: "Private Cloud", icon: Shield, desc: "Fully isolated cloud environment on dedicated hardware. Elasticity of public cloud, security of bare metal. Custom SLA up to 99.999%.", tags: ["Dedicated Hardware", "Custom SLA", "Air-gapped Option"] },
  { title: "Hybrid Cloud", icon: Link2, desc: "Seamlessly connect on-premises infrastructure to our global network via dedicated private fiber. One control plane, infinite scale.", tags: ["Private Fiber", "SD-WAN", "Unified Control"] },
  { title: "Multi-Cloud Fabric", icon: Layers, desc: "Orchestrate workloads across Sovereign, AWS, GCP, and Azure from a single dashboard. Optimize cost and performance automatically.", tags: ["Any Cloud", "Cost Optimizer", "Single Pane"] },
  { title: "Managed Kubernetes", icon: Settings, desc: "Production-ready K8s clusters deployed in 3 minutes. Auto-scaling, automated upgrades, integrated monitoring.", tags: ["CNCF Certified", "Auto-scale", "GitOps Ready"] },
];

export default function Cloud() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      <section className="pt-36 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a2e]/40 via-transparent to-transparent" />
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 text-sm text-muted-foreground">
            <CloudIcon className="w-4 h-4 text-[var(--neon-purple)]" />
            <span>Cloud Solutions</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.05]">
            Your Cloud.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-blue)]">Your Architecture.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">Private, hybrid, and multi-cloud solutions engineered for enterprises that refuse to compromise on performance, security, or control.</p>
          <Link href="/contact"><button className="rounded-full px-8 h-12 bg-white text-black font-medium hover:bg-gray-200 transition-all flex items-center space-x-2 mx-auto"><span>Talk to Solutions Team</span><ArrowRight className="w-4 h-4"/></button></Link>
        </motion.div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {SOLUTIONS.map((s, i) => (
            <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.12}} whileHover={{y:-6}} className="p-10 rounded-3xl bg-[#161616] border border-white/5 hover:border-[var(--neon-purple)]/20 transition-all group">
              <s.icon className="w-10 h-10 mb-6 text-[var(--neon-purple)] group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t, j) => <span key={j} className="text-xs border border-white/10 rounded-full px-3 py-1 text-muted-foreground">{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Ready to design your cloud?</h2>
          <p className="text-xl text-muted-foreground mb-10">Our solutions architects will design the optimal architecture for your workloads and compliance requirements.</p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/contact"><button className="rounded-full px-8 h-12 bg-white text-black font-medium hover:bg-gray-200 transition-all">Schedule a Call</button></Link>
            <Link href="/datacenter"><button className="rounded-full px-8 h-12 border border-white/20 text-white font-medium hover:bg-white/5 transition-all">View Data Centers</button></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}