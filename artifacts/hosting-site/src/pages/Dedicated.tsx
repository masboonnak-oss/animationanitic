import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Cpu, HardDrive, Network } from "lucide-react";

export default function Dedicated() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Dedicated Servers</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-16">
          Single-tenant bare metal performance for your most demanding workloads. 
          Deployed instantly across 18 global regions.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Entry Compute", cpu: "AMD Ryzen 9 5950X", ram: "128GB ECC", storage: "2x 1.92TB NVMe", port: "1 Gbps", price: 149 },
            { name: "Pro Compute", cpu: "AMD EPYC 7502P", ram: "256GB ECC", storage: "2x 3.84TB NVMe", port: "10 Gbps", price: 299 },
            { name: "Enterprise Dual", cpu: "2x AMD EPYC 7742", ram: "1TB ECC", storage: "4x 3.84TB NVMe", port: "25 Gbps", price: 899 },
          ].map((server, i) => (
            <div key={i} className="bg-[#161616] border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-colors">
              <h3 className="text-2xl font-bold mb-2">{server.name}</h3>
              <div className="flex items-end mb-8">
                <span className="text-4xl font-display font-bold">${server.price}</span>
                <span className="text-muted-foreground ml-2 mb-1">/mo</span>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center text-muted-foreground">
                  <Cpu className="w-5 h-5 mr-3 text-white" />
                  {server.cpu}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <HardDrive className="w-5 h-5 mr-3 text-white" />
                  {server.ram} / {server.storage}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Network className="w-5 h-5 mr-3 text-white" />
                  {server.port} Unmetered
                </div>
              </div>

              <Button className="w-full bg-white text-black hover:bg-gray-200">Deploy Server</Button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
