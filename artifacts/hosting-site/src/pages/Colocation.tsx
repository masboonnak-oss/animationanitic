import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function Colocation() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Global Colocation</h1>
          <p className="text-xl text-muted-foreground mb-12">
            House your enterprise hardware in our Tier IV datacenter facilities. 
            Direct cross-connects to major cloud providers and peering exchanges.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-200">Request a Quote</Button>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {['10U Quarter Rack', '20U Half Rack', '42U Full Rack'].map((rack) => (
            <div key={rack} className="p-8 border border-white/10 rounded-2xl bg-[#161616]">
              <h3 className="text-2xl font-bold mb-4">{rack}</h3>
              <ul className="space-y-3 text-muted-foreground mb-8">
                <li>• Redundant A/B Power</li>
                <li>• 1Gbps Unmetered Port</li>
                <li>• 24/7 Remote Hands</li>
                <li>• /29 IPv4 Allocation</li>
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
