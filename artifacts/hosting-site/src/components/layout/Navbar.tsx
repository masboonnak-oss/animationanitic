import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogoChip } from "@/components/ui/LogoDecor";
import { AUTH_EVENT, clearDemoSession, getAdminRankLabel, getDemoUser, type DemoUser } from "@/lib/demo-auth";

const NAV_LINKS = [
  { href: "/products", label: "Hosting" },
  { href: "/payment", label: "Payment" },
  { href: "/ai", label: "AI Platform" },
  { href: "/datacenter", label: "Data Center" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState<DemoUser | null>(() => getDemoUser());

  useEffect(() => {
    const syncUser = () => setUser(getDemoUser());

    window.addEventListener(AUTH_EVENT, syncUser);
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener(AUTH_EVENT, syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const logout = () => {
    clearDemoSession();
    setLocation("/");
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center border-b border-white/10 bg-[#0c0c0c]/78 px-4 shadow-[0_14px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:px-10">
      <div className="flex min-w-0 items-center gap-5 lg:gap-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <LogoChip className="h-9 w-9" />
          <span className="truncate font-display text-base font-bold uppercase tracking-[0.18em] sm:text-lg">Sovereign</span>
        </Link>
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = location === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  active && "bg-white text-black hover:text-black",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        {user ? (
          <>
            <Link href={user.role === "admin" ? "/admin" : "/dashboard"} className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex">
              {user.role === "admin" ? getAdminRankLabel(user.rank) : "Dashboard"}
            </Link>
            <Button type="button" onClick={logout} variant="outline" className="h-10 rounded-full border-white/15 px-4 text-white sm:px-6">Logout</Button>
          </>
        ) : (
          <>
            <Link href="/login" className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex">Login</Link>
            <Link href="/register">
              <Button variant="default" className="h-10 rounded-full px-4 sm:px-6">Get Started</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
