import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Built for scale. <br/>Engineered for speed.</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nova was founded on a simple premise: enterprise infrastructure shouldn't be complicated, slow, or unpredictably priced.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
          <div>
            <div className="aspect-square bg-[#1a1a1a] rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              {/* Optional: Add generate_image visual here */}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We're building the foundation for the next generation of internet companies. Our global network of premium datacenters provides the performance, reliability, and security that mission-critical applications demand.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Unlike legacy cloud providers, we don't nickel-and-dime you on bandwidth or charge premium support fees. We offer transparent pricing for world-class hardware.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { stat: "$0", label: "Hidden Fees" },
              { stat: "100%", label: "NVMe Storage" },
              { stat: "24/7", label: "Expert Support" },
            ].map((item, i) => (
              <div key={i} className="p-12 rounded-3xl bg-[#161616] border border-white/10">
                <div className="text-6xl font-display font-bold mb-4">{item.stat}</div>
                <div className="text-muted-foreground uppercase tracking-widest">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
