import { cn } from "@/lib/utils";

type LogoDecorProps = {
  className?: string;
  glowClassName?: string;
};

export function LogoDecor({ className, glowClassName }: LogoDecorProps) {
  return (
    <div className={cn("pointer-events-none absolute select-none", className)} aria-hidden="true">
      <div
        className={cn(
          "absolute inset-[12%] rounded-full bg-[var(--neon-blue)]/20 blur-3xl",
          glowClassName,
        )}
      />
      <img
        src="/sovereign-logo.jpg"
        alt=""
        className="relative h-full w-full object-contain opacity-[0.13] invert"
        draggable={false}
      />
    </div>
  );
}

export function LogoChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/[0.06] shadow-[0_0_28px_rgba(0,212,255,0.14)]",
        className,
      )}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(0,212,255,0.28),transparent_45%)]" />
      <img src="/sovereign-logo.jpg" alt="Sovereign Engine" className="relative h-8 w-8 object-contain invert" />
    </span>
  );
}
