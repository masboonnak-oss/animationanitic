import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Brain, Sparkles, MessageSquare, BarChart3, Shield, Cpu, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function AIPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#9b59ff]/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#00d4ff]/10 rounded-full blur-[100px]" />
        </div>
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 text-sm text-muted-foreground">
            <Brain className="w-4 h-4 text-[var(--neon-purple)]" />
            <span>Sovereign AI Platform</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight mb-8 leading-[1.05]">
            Intelligence<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-blue)] to-[var(--neon-cyan)]">Built In</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">An AI layer across your entire platform — automating operations, surfacing insights, and acting as your 24/7 enterprise intelligence layer.</p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/register"><button className="rounded-full px-8 h-12 bg-white text-black font-medium hover:bg-gray-200 transition-all flex items-center space-x-2"><span>Activate AI</span><ArrowRight className="w-4 h-4"/></button></Link>
            <Link href="/contact"><button className="rounded-full px-8 h-12 border border-white/20 text-white font-medium hover:bg-white/5 transition-all">Request Demo</button></Link>
          </div>
        </motion.div>
      </section>

      {/* AI Capabilities */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Every System, Smarter</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Sovereign AI integrates deeply with your infrastructure, payment flows, and organization to deliver real intelligence — not just chatbots.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: MessageSquare, title: "AI Assistant", desc: "Your 24/7 expert assistant for infrastructure decisions, troubleshooting, cost optimization, and operations guidance.", color: "var(--neon-blue)" },
            { icon: BarChart3, title: "Predictive Analytics", desc: "Forecasts resource usage, payment trends, and security threats before they happen. Act on intelligence, not alerts.", color: "var(--neon-purple)" },
            { icon: Shield, title: "Threat Intelligence", desc: "ML models trained on billions of data points detect anomalies across your servers, payments, and access logs in real time.", color: "var(--neon-cyan)" },
            { icon: Cpu, title: "Workload Optimization", desc: "Automatically right-sizes your infrastructure, suggests scaling policies, and eliminates idle spend.", color: "var(--neon-blue)" },
            { icon: Sparkles, title: "Workflow Automation", desc: "Natural language workflows — describe what you need, AI builds and deploys the automation pipeline.", color: "var(--neon-purple)" },
            { icon: Brain, title: "Custom Models", desc: "Deploy and fine-tune open-source or proprietary models on our GPU clusters with one command.", color: "var(--neon-cyan)" },
          ].map((f, i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} whileHover={{y:-6,scale:1.02}} className="p-8 rounded-3xl bg-[#161616] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background: `radial-gradient(circle at 30% 30%, ${f.color}08, transparent 60%)`}} />
              <f.icon className="w-10 h-10 mb-6 transition-colors relative z-10" style={{color: f.color, filter: `drop-shadow(0 0 10px ${f.color}40)`}} />
              <h3 className="text-xl font-bold mb-3 relative z-10">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}