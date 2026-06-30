import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16">
        <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{duration:0.8}}>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Get in touch.</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Whether you need a custom enterprise solution or technical support, our team is available 24/7.
          </p>
          
          <div className="space-y-6">
            <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}>
              <h3 className="font-bold text-lg">Sales</h3>
              <p className="text-muted-foreground">sales@sovereign.io</p>
            </motion.div>
            <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.2}}>
              <h3 className="font-bold text-lg">Support</h3>
              <p className="text-muted-foreground">support@sovereign.io</p>
            </motion.div>
            <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.3}}>
              <h3 className="font-bold text-lg">Headquarters</h3>
              <p className="text-muted-foreground">1 Sovereign Place<br/>San Francisco, CA 94107</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:0.8,delay:0.2}} className="bg-[#161616]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-xl relative">
          {sent ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#161616] rounded-3xl z-10 p-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground mb-6">Our team will get back to you shortly.</p>
              <Button onClick={() => setSent(false)} variant="outline" className="border-white/20 text-white">Send Another</Button>
            </div>
          ) : null}
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input required className="bg-black/50 border-white/10 focus:border-white/30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input required className="bg-black/50 border-white/10 focus:border-white/30" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Work Email</label>
              <Input required type="email" className="bg-black/50 border-white/10 focus:border-white/30" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea required rows={5} className="bg-black/50 border-white/10 focus:border-white/30 resize-none" />
            </div>
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 h-12 rounded-xl text-base font-medium">Send Message</Button>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}