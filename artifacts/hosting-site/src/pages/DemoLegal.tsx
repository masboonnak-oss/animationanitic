import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, FileCheck2, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";

type DemoLegalProps = {
  title: string;
  eyebrow: string;
};

export default function DemoLegal({ title, eyebrow }: DemoLegalProps) {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,212,255,0.16),transparent_34%),radial-gradient(circle_at_80%_30%,rgba(155,89,255,0.13),transparent_30%)]" />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-muted-foreground">
            <FileCheck2 className="h-4 w-4 text-[var(--neon-blue)]" />
            <span>{eyebrow}</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">{title}</h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            This page is wired as a demo destination so every navigation item has a real route and participates in the paper-slide transition system.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button className="h-12 rounded-full px-7">
                Contact team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="h-12 rounded-full border-white/20 px-7 text-white">
                Back home
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-24 md:grid-cols-3">
        {[
          { icon: ShieldCheck, title: "Enterprise controls", desc: "Policy text, audit notes, and compliance links can be filled in later." },
          { icon: FileCheck2, title: "Ready route", desc: "The route is already connected through the app shell and footer navigation." },
          { icon: Sparkles, title: "Animation enabled", desc: "Opening this page uses the same 2D paper map as the product pages." },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
            <item.icon className="mb-5 h-8 w-8 text-[var(--neon-blue)]" />
            <h2 className="mb-3 text-xl font-bold">{item.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
