import { type ReactNode } from "react";
import {
  Activity, BarChart3, Brain, Building2, Clock, Cloud, Cpu, CreditCard, Database,
  Gauge, Globe, Home, Info, KeyRound, Layers, LayoutDashboard, Lock,
  LogIn, Mail, MapPin, Network, Server, Shield, ShieldCheck, Sparkles, UserPlus,
  Users, Wallet, Wifi, Zap,
} from "lucide-react";

// ─── Shared mini data-card renderers (ported from Triangle-Core) ──────────────
function StatGrid({ items, color }: { items: { label: string; value: string }[]; color: string }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg p-2.5" style={{ background: `${color}10`, border: `1px solid ${color}24` }}>
          <div className="text-[10px] text-white/40 mb-1">{item.label}</div>
          <div className="text-sm font-bold text-white/85">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
function StatList({ items }: { items: { label: string; value: string; color: string }[] }) {
  return (
    <div className="space-y-2.5">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
          <span className="text-white/50">{item.label}</span>
          <span className="font-bold" style={{ color: item.color }}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}
function HealthBars({ items }: { items: { label: string; pct: number; color: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i}>
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-white/50">{item.label}</span>
            <span style={{ color: item.color }}>{item.pct}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
function TagGrid({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((label, i) => (
        <div key={i} className="rounded-lg py-2 text-center text-[10px] font-bold tracking-wider" style={{ background: `${color}16`, border: `1px solid ${color}30`, color }}>
          {label}
        </div>
      ))}
    </div>
  );
}

// ─── Card node ────────────────────────────────────────────────────────────────
export interface CardNode {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  icon: ReactNode;
  preview: ReactNode;
  children?: CardNode[];
}

const S = 16;
const leaf = (id: string, title: string, subtitle: string, accent: string, icon: ReactNode, preview: ReactNode): CardNode =>
  ({ id, title, subtitle, accentColor: accent, icon, preview });
const cat = (id: string, title: string, subtitle: string, accent: string, icon: ReactNode, children: CardNode[]): CardNode =>
  ({ id, title, subtitle, accentColor: accent, icon, children, preview: <TagGrid color={accent} items={children.map((c) => c.title)} /> });

// ─── Systems → data cards ─────────────────────────────────────────────────────
const hosting = cat("hosting", "HOSTING", "Cloud VPS & Compute", "#00D4FF", <Server size={S} />, [
  leaf("h-plans", "PLANS", "Pricing Tiers", "#00D4FF", <Layers size={S} />, <StatList items={[{ label: "Starter", value: "$10/mo", color: "#00D4FF" }, { label: "Pro", value: "$40/mo", color: "#00F5FF" }, { label: "Enterprise", value: "$120/mo", color: "#A855F7" }, { label: "Custom", value: "Contact", color: "#F59E0B" }]} />),
  leaf("h-regions", "REGIONS", "Global Footprint", "#00D4FF", <Globe size={S} />, <StatGrid color="#00D4FF" items={[{ label: "Regions", value: "18" }, { label: "PoPs", value: "18" }, { label: "Edge", value: "Yes" }, { label: "Anycast", value: "Yes" }]} />),
  leaf("h-network", "NETWORK", "Performance", "#00D4FF", <Wifi size={S} />, <StatGrid color="#00D4FF" items={[{ label: "DDoS", value: "120Tbps" }, { label: "Storage", value: "NVMe" }, { label: "Bandwidth", value: "10 TB" }, { label: "Uplink", value: "10 Gbps" }]} />),
]);
const dedicated = cat("dedicated", "DEDICATED", "Bare-metal Servers", "#4EA1FF", <Cpu size={S} />, [
  leaf("d-specs", "SPECS", "Hardware", "#4EA1FF", <Gauge size={S} />, <StatList items={[{ label: "vCPU", value: "up to 64", color: "#4EA1FF" }, { label: "RAM", value: "128 GB", color: "#00F5FF" }, { label: "Storage", value: "2.5 TB", color: "#A855F7" }, { label: "GPU", value: "Optional", color: "#F59E0B" }]} />),
  leaf("d-pricing", "PRICING", "Tiers", "#4EA1FF", <BarChart3 size={S} />, <StatList items={[{ label: "XXL", value: "$320/mo", color: "#4EA1FF" }, { label: "Titan", value: "$640/mo", color: "#00F5FF" }]} />),
  leaf("d-uplink", "UPLINK", "Connectivity", "#4EA1FF", <Network size={S} />, <StatGrid color="#4EA1FF" items={[{ label: "Port", value: "25 Gbps" }, { label: "Transit", value: "Premium" }, { label: "IPv6", value: "Yes" }, { label: "BGP", value: "Yes" }]} />),
]);
const cloud = cat("cloud", "CLOUD", "Private / Hybrid Fabric", "#5BC8FF", <Cloud size={S} />, [
  leaf("c-models", "MODELS", "Deployment", "#5BC8FF", <Layers size={S} />, <TagGrid color="#5BC8FF" items={["Private", "Hybrid", "Multi-cloud", "Anycast"]} />),
  leaf("c-regions", "REGIONS", "Reach", "#5BC8FF", <Globe size={S} />, <StatGrid color="#5BC8FF" items={[{ label: "Regions", value: "18" }, { label: "Failover", value: "sub-ms" }, { label: "Zones", value: "3" }, { label: "Edge", value: "Yes" }]} />),
  leaf("c-sla", "SLA", "Guarantees", "#5BC8FF", <Shield size={S} />, <StatList items={[{ label: "Uptime", value: "99.99%", color: "#5BC8FF" }, { label: "Support", value: "24/7", color: "#00F5FF" }, { label: "Backups", value: "Daily", color: "#A855F7" }, { label: "RPO", value: "5 min", color: "#F59E0B" }]} />),
]);
const colocation = cat("colocation", "COLOCATION", "Rack · Cage · Suite", "#38BDF8", <Network size={S} />, [
  leaf("co-space", "SPACE", "Footprint", "#38BDF8", <Layers size={S} />, <TagGrid color="#38BDF8" items={["Half Rack", "Full Rack", "Cage", "Suite"]} />),
  leaf("co-power", "POWER", "Resilience", "#38BDF8", <Zap size={S} />, <StatGrid color="#38BDF8" items={[{ label: "Redundancy", value: "2N" }, { label: "Density", value: "30 kW" }, { label: "UPS", value: "Yes" }, { label: "Genset", value: "Yes" }]} />),
  leaf("co-conn", "CONNECTIVITY", "Carriers", "#38BDF8", <Wifi size={S} />, <StatList items={[{ label: "Cross-connect", value: "Yes", color: "#38BDF8" }, { label: "Carriers", value: "20+", color: "#00F5FF" }, { label: "IX", value: "Yes", color: "#A855F7" }, { label: "Remote hands", value: "24/7", color: "#F59E0B" }]} />),
]);
const datacenter = cat("datacenter", "DATA CENTER", "Tier IV Facilities", "#36A3FF", <Database size={S} />, [
  leaf("dc-facility", "FACILITY", "Build", "#36A3FF", <Building2 size={S} />, <StatGrid color="#36A3FF" items={[{ label: "Tier", value: "IV" }, { label: "Density", value: "30 kW" }, { label: "Cooling", value: "N+1" }, { label: "Security", value: "24/7" }]} />),
  leaf("dc-loc", "LOCATIONS", "Global", "#36A3FF", <MapPin size={S} />, <StatGrid color="#36A3FF" items={[{ label: "Sites", value: "18" }, { label: "Continents", value: "5" }, { label: "Edge", value: "Yes" }, { label: "PoPs", value: "18" }]} />),
  leaf("dc-green", "SUSTAINABILITY", "Energy", "#36A3FF", <Sparkles size={S} />, <StatGrid color="#36A3FF" items={[{ label: "Renewable", value: "100%" }, { label: "PUE", value: "1.2" }, { label: "Carbon", value: "Net-0" }, { label: "Water", value: "Low" }]} />),
]);

const payment = cat("payment", "PAYMENT", "Global Gateway", "#00FFCC", <CreditCard size={S} />, [
  leaf("p-coverage", "COVERAGE", "Reach", "#00FFCC", <Globe size={S} />, <StatList items={[{ label: "Countries", value: "180+", color: "#00FFCC" }, { label: "Currencies", value: "135", color: "#00F5FF" }, { label: "Methods", value: "50+", color: "#A855F7" }, { label: "Wallets", value: "Yes", color: "#F59E0B" }]} />),
  leaf("p-settle", "SETTLEMENT", "Payouts", "#00FFCC", <Clock size={S} />, <StatList items={[{ label: "Speed", value: "Hours", color: "#00FFCC" }, { label: "Payout", value: "Daily", color: "#00F5FF" }, { label: "FX", value: "Live", color: "#A855F7" }, { label: "Disputes", value: "Managed", color: "#F59E0B" }]} />),
  leaf("p-compliance", "COMPLIANCE", "Security", "#00FFCC", <Shield size={S} />, <StatList items={[{ label: "PCI", value: "Level 1", color: "#00FFCC" }, { label: "3DS2", value: "Yes", color: "#00F5FF" }, { label: "Fraud", value: "AI", color: "#A855F7" }, { label: "KYC", value: "Yes", color: "#F59E0B" }]} />),
]);
const topup = cat("topup", "TOP-UP", "Wallet Recharge", "#34F5C5", <Wallet size={S} />, [
  leaf("t-verify", "VERIFY", "Slip Check", "#34F5C5", <ShieldCheck size={S} />, <StatList items={[{ label: "QR", value: "Mini-QR", color: "#34F5C5" }, { label: "OCR", value: "tha+eng", color: "#00F5FF" }, { label: "MIME", value: "Magic bytes", color: "#A855F7" }, { label: "Unique", value: "Per slip", color: "#F59E0B" }]} />),
  leaf("t-reconcile", "RECONCILE", "Bank Match", "#34F5C5", <Activity size={S} />, <StatList items={[{ label: "Rule A", value: "Strict", color: "#34F5C5" }, { label: "Rule B", value: "Heuristic", color: "#00F5FF" }, { label: "Window", value: "5 min", color: "#A855F7" }, { label: "Timeout", value: "15 min", color: "#F59E0B" }]} />),
  leaf("t-wallet", "WALLET", "Credit", "#34F5C5", <Wallet size={S} />, <StatGrid color="#34F5C5" items={[{ label: "Credit", value: "Atomic" }, { label: "Ledger", value: "Unique" }, { label: "Timezone", value: "Bangkok" }, { label: "Money", value: "Satang" }]} />),
]);

const ai = cat("ai", "AI PLATFORM", "Automation & Insight", "#9B59FF", <Brain size={S} />, [
  leaf("ai-cap", "CAPABILITIES", "Features", "#9B59FF", <Sparkles size={S} />, <TagGrid color="#9B59FF" items={["Assistant", "Analytics", "Threat Detect", "Optimize"]} />),
  leaf("ai-models", "MODELS", "Compute", "#9B59FF", <Cpu size={S} />, <StatList items={[{ label: "Deploy", value: "GPU", color: "#9B59FF" }, { label: "Custom ML", value: "Yes", color: "#00F5FF" }, { label: "Inference", value: "Fast", color: "#34F5C5" }, { label: "Scaling", value: "Auto", color: "#F59E0B" }]} />),
  leaf("ai-usage", "USAGE", "Live", "#9B59FF", <Gauge size={S} />, <StatGrid color="#9B59FF" items={[{ label: "Requests", value: "Live" }, { label: "Latency", value: "Low" }, { label: "Uptime", value: "99.9%" }, { label: "Cost", value: "Metered" }]} />),
]);
const orgs = cat("orgs", "ORGANIZATIONS", "Teams & Access", "#FFC857", <Building2 size={S} />, [
  leaf("o-access", "ACCESS", "Control", "#FFC857", <KeyRound size={S} />, <StatList items={[{ label: "RBAC", value: "Yes", color: "#FFC857" }, { label: "SSO", value: "Yes", color: "#00F5FF" }, { label: "MFA", value: "Yes", color: "#A855F7" }, { label: "API keys", value: "Yes", color: "#34F5C5" }]} />),
  leaf("o-teams", "TEAMS", "Workspaces", "#FFC857", <Users size={S} />, <StatGrid color="#FFC857" items={[{ label: "Workspaces", value: "Multi" }, { label: "Members", value: "Unlimited" }, { label: "Roles", value: "Custom" }, { label: "Invites", value: "Yes" }]} />),
  leaf("o-audit", "AUDIT", "Logs", "#FFC857", <Lock size={S} />, <StatList items={[{ label: "Logs", value: "Full", color: "#FFC857" }, { label: "Export", value: "Yes", color: "#00F5FF" }, { label: "Retention", value: "1 year", color: "#A855F7" }, { label: "Alerts", value: "Yes", color: "#34F5C5" }]} />),
]);
const dashboard = cat("dashboard", "DASHBOARD", "Command Surface", "#7CFFCB", <LayoutDashboard size={S} />, [
  leaf("db-overview", "OVERVIEW", "Snapshot", "#7CFFCB", <Gauge size={S} />, <StatGrid color="#7CFFCB" items={[{ label: "Uptime", value: "99.99%" }, { label: "Tickets", value: "Live" }, { label: "Usage", value: "Realtime" }, { label: "Alerts", value: "On" }]} />),
  leaf("db-usage", "USAGE", "Resources", "#7CFFCB", <Activity size={S} />, <HealthBars items={[{ label: "CPU", pct: 62, color: "#7CFFCB" }, { label: "Memory", pct: 48, color: "#00F5FF" }, { label: "Storage", pct: 71, color: "#FFC857" }, { label: "Network", pct: 35, color: "#9B59FF" }]} />),
  leaf("db-alerts", "ALERTS", "Signals", "#7CFFCB", <Activity size={S} />, <StatList items={[{ label: "Critical", value: "0", color: "#FF4D9E" }, { label: "Warning", value: "2", color: "#F59E0B" }, { label: "Info", value: "5", color: "#00F5FF" }, { label: "Resolved", value: "18", color: "#34F5C5" }]} />),
]);

const about = cat("about", "ABOUT", "Company & Values", "#C0A3FF", <Info size={S} />, [
  leaf("a-company", "COMPANY", "Profile", "#C0A3FF", <Building2 size={S} />, <StatList items={[{ label: "Founded", value: "2019", color: "#C0A3FF" }, { label: "HQ", value: "San Francisco", color: "#00F5FF" }, { label: "Team", value: "240+", color: "#A855F7" }, { label: "Stage", value: "Series C", color: "#F59E0B" }]} />),
  leaf("a-reach", "REACH", "Scale", "#C0A3FF", <Globe size={S} />, <StatGrid color="#C0A3FF" items={[{ label: "Locations", value: "18" }, { label: "Clients", value: "12k+" }, { label: "Countries", value: "180+" }, { label: "Volume", value: "$2.4B+" }]} />),
  leaf("a-values", "VALUES", "Principles", "#C0A3FF", <Sparkles size={S} />, <TagGrid color="#C0A3FF" items={["Sovereign", "Secure", "Open", "Reliable"]} />),
]);
const contact = cat("contact", "CONTACT", "Sales & Support", "#FFB86B", <Mail size={S} />, [
  leaf("ct-channels", "CHANNELS", "Reach Us", "#FFB86B", <Mail size={S} />, <StatList items={[{ label: "Sales", value: "sales@", color: "#FFB86B" }, { label: "Support", value: "24/7", color: "#00F5FF" }, { label: "Phone", value: "24/7", color: "#A855F7" }, { label: "Chat", value: "AI", color: "#34F5C5" }]} />),
  leaf("ct-office", "OFFICE", "HQ", "#FFB86B", <MapPin size={S} />, <StatList items={[{ label: "Address", value: "1 Sovereign Pl", color: "#FFB86B" }, { label: "City", value: "SF, CA", color: "#00F5FF" }, { label: "Zip", value: "94107", color: "#A855F7" }, { label: "Hours", value: "24/7", color: "#34F5C5" }]} />),
  leaf("ct-sla", "RESPONSE", "Service", "#FFB86B", <Clock size={S} />, <StatGrid color="#FFB86B" items={[{ label: "First reply", value: "< 1h" }, { label: "Resolve", value: "< 24h" }, { label: "Uptime", value: "99.99%" }, { label: "NPS", value: "72" }]} />),
]);
const status = cat("status", "STATUS", "Service Health", "#FF7A90", <Activity size={S} />, [
  leaf("s-health", "HEALTH", "Now", "#FF7A90", <Activity size={S} />, <HealthBars items={[{ label: "API", pct: 99, color: "#34F5C5" }, { label: "Network", pct: 100, color: "#00F5FF" }, { label: "Storage", pct: 98, color: "#FFC857" }, { label: "Payments", pct: 99, color: "#9B59FF" }]} />),
  leaf("s-incidents", "INCIDENTS", "History", "#FF7A90", <Info size={S} />, <StatList items={[{ label: "Active", value: "0", color: "#34F5C5" }, { label: "Last", value: "12d ago", color: "#00F5FF" }, { label: "MTTR", value: "18 min", color: "#A855F7" }, { label: "This month", value: "1", color: "#F59E0B" }]} />),
  leaf("s-uptime", "UPTIME", "Track Record", "#FF7A90", <Gauge size={S} />, <StatGrid color="#FF7A90" items={[{ label: "24h", value: "100%" }, { label: "7d", value: "99.99%" }, { label: "30d", value: "99.98%" }, { label: "90d", value: "99.99%" }]} />),
]);

const login = cat("login", "LOGIN", "Access Account", "#E2E8F0", <LogIn size={S} />, [
  leaf("l-access", "ACCESS", "Methods", "#E2E8F0", <KeyRound size={S} />, <StatList items={[{ label: "Email", value: "Yes", color: "#E2E8F0" }, { label: "SSO", value: "Yes", color: "#00F5FF" }, { label: "MFA", value: "Optional", color: "#A855F7" }, { label: "Demo", value: "Yes", color: "#34F5C5" }]} />),
  leaf("l-security", "SECURITY", "Protection", "#E2E8F0", <Shield size={S} />, <TagGrid color="#E2E8F0" items={["TLS 1.3", "MFA", "Audit", "Lockout"]} />),
]);
const register = cat("register", "REGISTER", "Create Account", "#A0F0D0", <UserPlus size={S} />, [
  leaf("r-signup", "SIGN-UP", "Onboarding", "#A0F0D0", <UserPlus size={S} />, <StatList items={[{ label: "Steps", value: "2", color: "#A0F0D0" }, { label: "Verify", value: "Email", color: "#00F5FF" }, { label: "Trial", value: "14 days", color: "#A855F7" }, { label: "Card", value: "Not required", color: "#34F5C5" }]} />),
  leaf("r-plans", "PLANS", "Choose Tier", "#A0F0D0", <Layers size={S} />, <StatList items={[{ label: "Starter", value: "$10/mo", color: "#A0F0D0" }, { label: "Pro", value: "$40/mo", color: "#00F5FF" }, { label: "Enterprise", value: "$120/mo", color: "#A855F7" }, { label: "Custom", value: "Contact", color: "#F59E0B" }]} />),
]);

// ─── Root domains ─────────────────────────────────────────────────────────────
export const ROOT_CARDS: CardNode[] = [
  leaf("home", "HOME", "Platform Overview", "#FFFFFF", <Home size={S} />, <StatGrid color="#FFFFFF" items={[{ label: "Uptime", value: "99.99%" }, { label: "Volume", value: "$2.4B+" }, { label: "Locations", value: "18" }, { label: "Clients", value: "12,000+" }]} />),
  cat("infrastructure", "INFRASTRUCTURE", "Compute & Network", "#00D4FF", <Server size={S} />, [hosting, dedicated, cloud, colocation, datacenter]),
  cat("payments", "PAYMENTS", "Gateway & Wallet", "#00FFCC", <CreditCard size={S} />, [payment, topup]),
  cat("platform", "PLATFORM", "AI · Orgs · Console", "#9B59FF", <Brain size={S} />, [ai, orgs, dashboard]),
  cat("company", "COMPANY", "About · Contact · Status", "#FFB86B", <ShieldCheck size={S} />, [about, contact, status]),
  cat("account", "ACCOUNT", "Sign in / Register", "#7CFFCB", <LogIn size={S} />, [login, register]),
];
