import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Get in touch.</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Whether you need a custom enterprise solution or technical support, our team is available 24/7.
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg">Sales</h3>
              <p className="text-muted-foreground">sales@nova.example.com</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Support</h3>
              <p className="text-muted-foreground">support@nova.example.com</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Headquarters</h3>
              <p className="text-muted-foreground">100 Nova Way<br/>San Francisco, CA 94107</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input className="bg-black/50 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input className="bg-black/50 border-white/10" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Work Email</label>
              <Input type="email" className="bg-black/50 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea rows={5} className="bg-black/50 border-white/10" />
            </div>
            <Button className="w-full bg-white text-black hover:bg-gray-200">Send Message</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
