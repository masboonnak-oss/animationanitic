import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Brain,
  Building2,
  CreditCard,
  Database,
  Home,
  LayoutDashboard,
  Mail,
  Server,
  Wallet,
} from "lucide-react";

/** One orbiting panel = one real page in the app. `href` drives wouter navigation. */
export interface OrbitItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
  /** Accent color drives the per-panel neon + dynamic stage lighting. */
  accent: string;
}

/**
 * The main pages, arranged around the ring. Order = orbit order.
 * Add/remove entries here to change the wheel — no other code changes needed.
 */
export const ORBIT_ITEMS: OrbitItem[] = [
  { id: "home", title: "Home", subtitle: "The Sovereign platform overview.", href: "/home", icon: Home, accent: "#ffffff" },
  { id: "hosting", title: "Hosting", subtitle: "Cloud VPS, dedicated compute & scalable infrastructure.", href: "/products", icon: Server, accent: "#00d4ff" },
  { id: "payment", title: "Payment", subtitle: "Global payment gateway with instant settlement.", href: "/payment", icon: CreditCard, accent: "#00ffcc" },
  { id: "topup", title: "Top-Up", subtitle: "Slip-verified wallet recharge & reconciliation.", href: "/topup", icon: Wallet, accent: "#34f5c5" },
  { id: "ai", title: "AI Platform", subtitle: "Automation, analytics & embedded intelligence.", href: "/ai", icon: Brain, accent: "#9b59ff" },
  { id: "datacenter", title: "Data Center", subtitle: "Tier IV facilities, colocation & private suites.", href: "/datacenter", icon: Database, accent: "#36a3ff" },
  { id: "orgs", title: "Organizations", subtitle: "Teams, roles, SSO & enterprise controls.", href: "/organizations", icon: Building2, accent: "#ffc857" },
  { id: "dashboard", title: "Dashboard", subtitle: "Your operational command surface.", href: "/dashboard", icon: LayoutDashboard, accent: "#7cffcb" },
  { id: "status", title: "Status", subtitle: "Live service health & incident history.", href: "/status", icon: Activity, accent: "#ff7a90" },
  { id: "contact", title: "Contact", subtitle: "Sales, support & custom infrastructure.", href: "/contact", icon: Mail, accent: "#ffb86b" },
];
