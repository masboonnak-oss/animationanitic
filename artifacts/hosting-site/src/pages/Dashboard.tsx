import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useGetDashboardSummary, useGetUsageHistory, useListServers } from "@workspace/api-client-react";
import { Server, Activity, DollarSign, LifeBuoy } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary();
  const { data: history, isLoading: loadingHistory } = useGetUsageHistory();
  const { data: servers, isLoading: loadingServers } = useListServers();

  if (loadingSummary || loadingHistory || loadingServers) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-white/5 rounded w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-white/5 rounded-xl" />)}
          </div>
          <div className="h-64 bg-white/5 rounded-xl" />
        </div>
      </DashboardLayout>
    );
  }

  const statCards = [
    { title: "Total Servers", value: summary?.totalServers || 0, icon: Server },
    { title: "Running", value: summary?.runningServers || 0, icon: Activity, color: "text-green-500" },
    { title: "Monthly Spend", value: `$${summary?.monthlySpend || 0}`, icon: DollarSign },
    { title: "Open Tickets", value: summary?.openTickets || 0, icon: LifeBuoy, color: "text-orange-500" },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Overview</h1>
          <p className="text-muted-foreground text-sm">Monitor your infrastructure performance and billing.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <Card key={i} className="p-6 bg-[#161616] border-white/10 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
            <div className={`p-2 rounded-lg bg-white/5 ${stat.color || "text-white"}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="col-span-2 p-6 bg-[#161616] border-white/10">
          <h3 className="text-lg font-bold mb-6">Resource Usage</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history || []} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="date" stroke="#666" tick={{fill: '#666', fontSize: 12}} tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, {month:'short', day:'numeric'})} />
                <YAxis stroke="#666" tick={{fill: '#666', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="cpu" stroke="#fff" strokeWidth={2} dot={false} name="CPU (%)" />
                <Line type="monotone" dataKey="ram" stroke="#666" strokeWidth={2} dot={false} name="RAM (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-[#161616] border-white/10">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">Deploy New Server</button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">Manage SSH Keys</button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">View API Tokens</button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">Open Support Ticket</button>
          </div>
        </Card>
      </div>

      <Card className="bg-[#161616] border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-lg font-bold">Active Servers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111] text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">IP Address</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {(servers || []).map((server) => (
                <tr key={server.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{server.name}</td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{server.ip}</td>
                  <td className="px-6 py-4 uppercase tracking-wider text-xs">{server.type}</td>
                  <td className="px-6 py-4 text-muted-foreground">{server.location}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={
                      server.status === 'running' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                      server.status === 'provisioning' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }>
                      {server.status}
                    </Badge>
                  </td>
                </tr>
              ))}
              {(!servers || servers.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No servers found. Deploy your first server.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
