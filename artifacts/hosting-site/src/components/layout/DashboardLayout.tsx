import { Link, useLocation } from "wouter";
import { LayoutDashboard, Server, CreditCard, FileText, LifeBuoy, Settings, LogOut } from "lucide-react";
import { useGetMe, useLogout } from "@workspace/api-client-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const logoutMutation = useLogout();
  const { data: user } = useGetMe();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        window.location.href = "/";
      }
    });
  };

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Servers", href: "/dashboard/servers", icon: Server },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Invoices", href: "/dashboard/invoices", icon: FileText },
    { name: "Support", href: "/dashboard/support", icon: LifeBuoy },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#111111] flex text-white">
      <aside className="w-64 border-r border-white/10 bg-[#0a0a0a] flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-primary rounded-sm rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-background rounded-full" />
            </div>
            <span className="font-display font-bold text-lg tracking-wider uppercase">Nova</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-white/10 text-white" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-medium mr-3">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user?.name || "User"}</div>
              <div className="text-xs text-muted-foreground truncate">{user?.email || "user@example.com"}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
