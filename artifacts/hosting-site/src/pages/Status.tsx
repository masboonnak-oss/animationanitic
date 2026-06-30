import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useGetPlatformStats } from "@workspace/api-client-react";

export default function Status() {
  const { data: stats, isLoading } = useGetPlatformStats();

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
          <h1 className="text-4xl font-display font-bold">All Systems Operational</h1>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-24 bg-white/5 rounded-xl" />
            <div className="h-24 bg-white/5 rounded-xl" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-[#161616] border border-white/10 rounded-xl">
              <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Global Uptime</h3>
              <p className="text-3xl font-display font-bold text-green-500">{stats?.uptime || "99.99%"}</p>
            </div>
            <div className="p-6 bg-[#161616] border border-white/10 rounded-xl">
              <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Active Locations</h3>
              <p className="text-3xl font-display font-bold text-white">{stats?.locations || "18"}</p>
            </div>
            <div className="p-6 bg-[#161616] border border-white/10 rounded-xl">
              <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-2">DDoS Protection</h3>
              <p className="text-3xl font-display font-bold text-white">{stats?.protection || "Active"}</p>
            </div>
            <div className="p-6 bg-[#161616] border border-white/10 rounded-xl">
              <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Servers Online</h3>
              <p className="text-3xl font-display font-bold text-white">{stats?.servers || "5,000+"}</p>
            </div>
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
          <div className="p-8 border border-white/10 rounded-xl bg-[#161616] text-center text-muted-foreground">
            No incidents reported in the last 30 days.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
