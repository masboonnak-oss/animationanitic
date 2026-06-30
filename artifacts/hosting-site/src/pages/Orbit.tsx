import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { ORBIT_ITEMS } from "@/lib/orbit/orbit-items";
import { OrbitNav } from "@/components/orbit/OrbitNav";
import { ParticleField } from "@/components/ui/ParticleField";

/**
 * Immersive rotating circular navigation.
 *
 * This redesigns ONLY the navigation interaction — selecting a panel routes to
 * the real, existing page through wouter, so every route/auth/data flow is
 * untouched. Add `/orbit` to your entry point (or link to it) to use it.
 */
export default function Orbit() {
  const [, setLocation] = useLocation();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#06060c] text-white">
      {/* Animated gradient backdrop + vignette */}
      <div
        className="orbit-animated-gradient pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 22% 18%, rgba(0,212,255,0.16), transparent 60%)," +
            "radial-gradient(55% 50% at 82% 26%, rgba(155,89,255,0.16), transparent 60%)," +
            "radial-gradient(70% 60% at 50% 110%, rgba(0,255,204,0.12), transparent 60%)",
        }}
      />
      <ParticleField />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.65))" }}
      />

      {/* Top bar */}
      <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/home" className="group inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Enter site
        </Link>
        <span className="text-[11px] uppercase tracking-[0.34em] text-white/40">Sovereign · Orbit</span>
        <span className="w-[72px]" aria-hidden="true" />
      </header>

      <main className="relative z-10 h-full pt-16">
        <OrbitNav items={ORBIT_ITEMS} onSelect={(item) => setLocation(item.href)} />
      </main>
    </div>
  );
}
