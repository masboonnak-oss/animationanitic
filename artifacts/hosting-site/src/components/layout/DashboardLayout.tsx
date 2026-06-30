import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { LayoutDashboard, Server, CreditCard, FileText, LifeBuoy, Settings, LogOut, Brain, Building2, Shield } from "lucide-react";
import { AUTH_EVENT, clearDemoSession, getAdminRankLabel, getDemoUser, type DemoUser } from "@/lib/demo-auth";
import { LogoChip, LogoDecor } from "@/components/ui/LogoDecor";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
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

  const handleLogout = () => {
    clearDemoSession();
    setLocation("/");
  };

  const navItems = user?.role === "admin"
    ? [
        { name: "Admin Menu", href: "/admin", icon: Shield },
      ]
    : [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Servers", href: "/products", icon: Server },
        { name: "Payment", href: "/payment", icon: CreditCard },
        { name: "AI Assistant", href: "/ai", icon: Brain },
        { name: "Organizations", href: "/organizations", icon: Building2 },
        { name: "Billing", href: "/payment", icon: CreditCard },
        { name: "Invoices", href: "/privacy", icon: FileText },
        { name: "Support", href: "/status", icon: LifeBuoy },
        { name: "Settings", href: "/contact", icon: Settings },
      ];

  return (
    <div className="min-h-screen bg-[#111111] text-white lg:flex">
      <aside className="sticky top-0 z-40 flex flex-col border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
        <div className="flex min-h-16 items-center px-4 sm:px-6 lg:h-16 lg:shrink-0">
          <Link href="/" className="flex min-w-0 items-center space-x-3">
            <LogoChip className="h-8 w-8" />
            <span className="truncate font-display text-base font-bold uppercase tracking-[0.18em] sm:text-lg lg:tracking-[0.2em]">Sovereign</span>
          </Link>
        </div>
        
        <nav className="flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-3 pr-20 sm:px-6 sm:pr-24 lg:block lg:flex-1 lg:space-y-1 lg:overflow-y-auto lg:border-t lg:px-4 lg:py-6">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex shrink-0 items-center whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors lg:w-full lg:rounded-md ${
                  isActive 
                    ? "bg-white/10 text-white" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="mr-2 h-4 w-4 lg:mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 p-3 sm:px-6 lg:block lg:p-4">
          <div className="mb-0 flex min-w-0 items-center px-1 py-2 lg:mb-2 lg:px-3">
            <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 font-medium">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user?.name || "User"}</div>
              <div className="text-xs text-muted-foreground truncate">{user?.role === "admin" ? getAdminRankLabel(user.rank) : user?.email || "user@example.com"}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex shrink-0 items-center rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-white lg:w-full lg:rounded-md"
          >
            <LogOut className="mr-2 h-4 w-4 lg:mr-3" />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </aside>

      <main className="relative min-w-0 flex-1 overflow-y-auto">
        <LogoDecor className="fixed right-2 top-32 h-56 w-56 opacity-25 sm:right-8 sm:h-80 sm:w-80 sm:opacity-40" glowClassName="bg-[var(--neon-cyan)]/12" />
        <div className="relative z-10 mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
