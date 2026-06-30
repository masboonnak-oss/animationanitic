import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function Products() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        <h1 className="text-5xl font-display font-bold mb-6">Cloud VPS</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-12">
          High-performance virtual instances powered by enterprise-grade NVMe storage and the latest AMD EPYC processors.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Mock Product Cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-8 rounded-2xl bg-card border flex flex-col">
              <h3 className="text-xl font-bold mb-2">Instance {i}</h3>
              <div className="text-3xl font-display font-bold mb-6">${i * 10}<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center text-muted-foreground"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"/> {i * 2} vCPU Cores</li>
                <li className="flex items-center text-muted-foreground"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"/> {i * 4}GB RAM</li>
                <li className="flex items-center text-muted-foreground"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"/> {i * 50}GB NVMe</li>
              </ul>
              <Button className="w-full">Deploy Now</Button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
