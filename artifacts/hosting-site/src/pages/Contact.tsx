import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { createTicket } from "@/lib/admin-store";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitTicket = () => {
    const ticket = createTicket({
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      message: form.message,
    });
    setTicketId(ticket.id);
    setSent(true);
    setForm({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />
      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-10 px-4 pb-16 pt-28 sm:px-6 md:grid-cols-2 md:gap-16 md:pb-20 md:pt-32">
        <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{duration:0.8}}>
          <h1 className="mb-6 text-5xl font-bold md:text-7xl">Get in touch.</h1>
          <p className="mb-10 text-base text-muted-foreground sm:text-xl md:mb-12">
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

        <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:0.8,delay:0.2}} className="relative rounded-3xl border border-white/10 bg-[#161616]/80 p-5 shadow-xl backdrop-blur-xl sm:p-8">
          {sent ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#161616] rounded-3xl z-10 p-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground mb-2">Our team will get back to you shortly.</p>
              {ticketId ? <p className="text-xs text-muted-foreground mb-6">Ticket ID: {ticketId}</p> : null}
              <Button onClick={() => setSent(false)} variant="outline" className="border-white/20 text-white">Send Another</Button>
            </div>
          ) : null}
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); submitTicket(); }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input required value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} className="bg-black/50 border-white/10 focus:border-white/30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input required value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} className="bg-black/50 border-white/10 focus:border-white/30" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Work Email</label>
              <Input required type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className="bg-black/50 border-white/10 focus:border-white/30" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea required rows={5} value={form.message} onChange={(event) => updateField("message", event.target.value)} className="bg-black/50 border-white/10 focus:border-white/30 resize-none" />
            </div>
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 h-12 rounded-xl text-base font-medium">Send Message</Button>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
