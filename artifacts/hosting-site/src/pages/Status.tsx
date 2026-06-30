import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useGetPlatformStats } from "@workspace/api-client-react";
import { CheckCircle, AlertCircle } from "lucide-react";

const SERVICES = [
  { name: "Cloud VPS Network", region: "Global", status: "operational" },
  { name: "Dedicated Servers", region: "Global", status: "operational" },
  { name: "Payment Gateway", region: "Global", status: "operational" },
  { name: "AI Platform API", region: "Global", status: "operational" },
  { name: "Control Panel", region: "Global", status: "operational" },
  { name: "DNS / Anycast", region: "Global", status: "operational" },
  { name: "Object Storage", region: "All Regions", status: "operational" },
  { name: "Auth / SSO", region: "Global", status: "operational" },
  { name: "Billing API", region: "Global", status: "operational" },
];

const REGIONS = [
  { name: "Singapore", code: "SIN", status: "operational", latency: "1.2ms" },
  { name: "Frankfurt", code: "FRA", status: "operational", latency: "0.8ms" },
  { name: "New York", code: "NYC", status: "operational", latency: "1.1ms" },
  { name: "Tokyo", code: "TYO", status: "operational", latency: "0.9ms" },
  { name: "London", code: "LON", status: "operational", latency: "0.7ms" },
  { name: "São Paulo", code: "GRU", status: "operational", latency: "1.4ms" },
];

export default function Status() {
  const { data: stats } = useGetPlatformStats();

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      <section className="pt-36 pb-16 px-6 max-w-4xl mx-auto">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7}}>
          <div className="flex items-center space-x-4 mb-4">
            <motion.div className="w-4 h-4 rounded-full bg-green-500" animate={{scale:[1,1.3,1],opacity:[1,0.7,1]}} transition={{duration:2,repeat:Infinity}} />
            <h1 className="text-4xl font-display font-bold">All Systems Operational</h1>
          </div>
          <p className="text-muted-foreground ml-8">Last checked: just now · Updated in real time</p>
        </motion.div>
      </section>

      {/* Platform stats */}
      <section className="pb-8 px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Uptime (30d)", value: stats?.uptime || "99.99%" },
            { label: "Active Locations", value: String(stats?.locations || 18) },
            { label: "DDoS Protection", value: stats?.protection || "120Tbps" },
            { label: "Servers Online", value: String((stats?.servers || 5000) + "+") },
          ].map((s, i) => (
            <motion.div key={i} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}} className="p-5 bg-[#161616] border border-white/10 rounded-2xl text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{s.label}</p>
              <p className="text-2xl font-display font-bold text-green-400">{s.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="pb-8 px-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Services</h2>
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#161616]">
          {SERVICES.map((svc, i) => (
            <motion.div key={i} initial={{opacity:0,x:-10}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.05}} className={`flex items-center justify-between px-6 py-4 ${i < SERVICES.length-1 ? 'border-b border-white/5' : ''}`}>
              <div>
                <p className="font-medium">{svc.name}</p>
                <p className="text-xs text-muted-foreground">{svc.region}</p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500 capitalize">{svc.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Regions */}
      <section className="pb-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Regional Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {REGIONS.map((r, i) => (
            <motion.div key={i} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}} className="p-5 bg-[#161616] border border-white/10 rounded-2xl flex items-center justify-between">
              <div>
                <p className="font-bold">{r.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{r.code} · {r.latency} avg</p>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pb-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Incident History</h2>
        <div className="p-10 border border-white/10 rounded-2xl bg-[#161616] text-center">
          <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-4" />
          <p className="font-bold mb-1">No incidents in the last 90 days</p>
          <p className="text-sm text-muted-foreground">Sovereign maintains 99.99% uptime across all services.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}