import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Brain,
  Building2,
  Cloud,
  Cpu,
  CreditCard,
  Database,
  Home,
  Info,
  LayoutDashboard,
  LogIn,
  Mail,
  Network,
  Server,
  UserPlus,
  Wallet,
} from "lucide-react";

/** One orbiting card = one real page in the app. `href` drives wouter navigation. */
export interface OrbitItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
  /** Accent color drives the per-card neon + dynamic core lighting. */
  accent: string;
}

/**
 * Every page / system, arranged around the ring. Order = orbit order.
 * Add/remove entries here to change the wheel — no other code changes needed.
 */
export const ORBIT_ITEMS: OrbitItem[] = [
  { id: "home", title: "Home", subtitle: "The Sovereign platform overview.", href: "/home", icon: Home, accent: "#ffffff" },
  { id: "hosting", title: "Hosting", subtitle: "Cloud VPS & scalable infrastructure plans.", href: "/products", icon: Server, accent: "#00d4ff" },
  { id: "dedicated", title: "Dedicated", subtitle: "Bare-metal servers for intensive workloads.", href: "/dedicated", icon: Cpu, accent: "#4ea1ff" },
  { id: "cloud", title: "Cloud", subtitle: "Private, hybrid & multi-cloud fabric.", href: "/cloud", icon: Cloud, accent: "#5bc8ff" },
  { id: "colocation", title: "Colocation", subtitle: "Rack, cage, suite & cross-connect.", href: "/colocation", icon: Network, accent: "#38bdf8" },
  { id: "payment", title: "Payment", subtitle: "Global gateway with instant settlement.", href: "/payment", icon: CreditCard, accent: "#00ffcc" },
  { id: "topup", title: "Top-Up", subtitle: "Slip-verified wallet recharge.", href: "/topup", icon: Wallet, accent: "#34f5c5" },
  { id: "ai", title: "AI Platform", subtitle: "Automation, analytics & intelligence.", href: "/ai", icon: Brain, accent: "#9b59ff" },
  { id: "datacenter", title: "Data Center", subtitle: "Tier IV facilities & private suites.", href: "/datacenter", icon: Database, accent: "#36a3ff" },
  { id: "orgs", title: "Organizations", subtitle: "Teams, roles, SSO & enterprise controls.", href: "/organizations", icon: Building2, accent: "#ffc857" },
  { id: "dashboard", title: "Dashboard", subtitle: "Your operational command surface.", href: "/dashboard", icon: LayoutDashboard, accent: "#7cffcb" },
  { id: "status", title: "Status", subtitle: "Live service health & incidents.", href: "/status", icon: Activity, accent: "#ff7a90" },
  { id: "about", title: "About", subtitle: "Company story, values & leadership.", href: "/about", icon: Info, accent: "#c0a3ff" },
  { id: "contact", title: "Contact", subtitle: "Sales, support & custom infrastructure.", href: "/contact", icon: Mail, accent: "#ffb86b" },
  { id: "login", title: "Login", subtitle: "Sign in to the demo experience.", href: "/login", icon: LogIn, accent: "#e2e8f0" },
  { id: "register", title: "Register", subtitle: "Create your demo account.", href: "/register", icon: UserPlus, accent: "#a0f0d0" },
];
