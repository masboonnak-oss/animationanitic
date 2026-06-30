import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function Cloud() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full text-center">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Cloud Solutions</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Enterprise cloud architecture tailored to your specific regulatory and compliance requirements.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl bg-[#161616] border border-white/10">
            <h3 className="text-2xl font-bold mb-4">Private Cloud</h3>
            <p className="text-muted-foreground mb-6">
              A fully isolated cloud environment built on dedicated hardware. Get the elasticity of public cloud with the security of bare metal.
            </p>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Talk to Sales</Button>
          </div>
          <div className="p-8 rounded-2xl bg-[#161616] border border-white/10">
            <h3 className="text-2xl font-bold mb-4">Hybrid Cloud</h3>
            <p className="text-muted-foreground mb-6">
              Connect your on-premises infrastructure seamlessly to our global network via dedicated private fiber links.
            </p>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Talk to Sales</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
