import Background from "@/components/triangle/Background";
import TriangleCore from "@/components/triangle/TriangleCore";

/**
 * Triangle-Core navigation — the entire experience is the card system
 * (structure ported from masboonnak-oss/Triangle-Core, populated with our
 * pages/systems). Every page/system spreads out into cards that drill into
 * their data; there are no separate legacy pages.
 */
export default function Orbit() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#040407] text-white">
      <Background />
      <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-center px-5 py-5">
        <span className="text-[11px] uppercase tracking-[0.34em] text-white/40">Sovereign · Core</span>
      </header>
      <TriangleCore />
    </div>
  );
}
