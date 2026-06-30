import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Cpu, HardDrive, Network, Server } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Dedicated() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />
      <main className="flex-1 pt-36 pb-20 px-6 max-w-7xl mx-auto w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e]/60 via-transparent to-transparent pointer-events-none" />
        
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="relative z-10 text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 text-sm text-muted-foreground">
            <Server className="w-4 h-4 text-[var(--neon-purple)]" />
            <span>Dedicated Servers</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.05]">
            Bare Metal.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)]">Maximum Power.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Single-tenant bare metal performance for your most demanding workloads. 
            Deployed instantly across 18 global regions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {[
            { name: "Entry Compute", cpu: "AMD Ryzen 9 5950X", ram: "128GB ECC", storage: "2x 1.92TB NVMe", port: "1 Gbps", price: 149 },
            { name: "Pro Compute", cpu: "AMD EPYC 7502P", ram: "256GB ECC", storage: "2x 3.84TB NVMe", port: "10 Gbps", price: 299 },
            { name: "Enterprise Dual", cpu: "2x AMD EPYC 7742", ram: "1TB ECC", storage: "4x 3.84TB NVMe", port: "25 Gbps", price: 899 },
          ].map((server, i) => (
            <motion.div 
              key={i} 
              initial={{opacity:0,y:20}} 
              whileInView={{opacity:1,y:0}} 
              viewport={{once:true}} 
              transition={{delay:i*0.1}} 
              whileHover={{y:-4, scale:1.02}}
              className="bg-[#161616] border border-white/5 rounded-2xl p-8 flex flex-col hover:border-white/15 transition-all"
            >
              <h3 className="text-2xl font-bold mb-2">{server.name}</h3>
              <div className="flex items-end mb-8">
                <span className="text-4xl font-display font-bold" style={{textShadow:"0 0 20px rgba(0,212,255,0.2)"}}>${server.price}</span>
                <span className="text-muted-foreground ml-2 mb-1">/mo</span>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center text-muted-foreground">
                  <Cpu className="w-5 h-5 mr-3 text-[var(--neon-purple)]" />
                  {server.cpu}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <HardDrive className="w-5 h-5 mr-3 text-[var(--neon-purple)]" />
                  {server.ram} / {server.storage}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Network className="w-5 h-5 mr-3 text-[var(--neon-purple)]" />
                  {server.port} Unmetered
                </div>
              </div>

              <Link href="/register">
                <button className="w-full h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all">
                  Deploy Server
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}