export type TicketStatus = "new" | "accepted" | "in_progress" | "resolved";

export type SupportTicket = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: TicketStatus;
  assignee?: string;
  reply?: string;
  createdAt: string;
  updatedAt: string;
};

export type EditablePage = {
  path: string;
  name: string;
  title: string;
  description: string;
  published: boolean;
  updatedAt: string;
};

export type ProductPlan = {
  id: string;
  name: string;
  category: "vps" | "dedicated" | "cloud" | "colocation" | "payment" | "ai";
  description: string;
  vcpu: number;
  ram: number;
  storage: number;
  bandwidth: number;
  price: number;
  badge: string;
  active: boolean;
  updatedAt: string;
};

export type ActionSystem = "hosting" | "payment" | "ai" | "datacenter" | "support" | "general";

export type CustomAction = {
  id: string;
  label: string;
  description: string;
  url: string;
  system: ActionSystem;
  color: string;
  newTab: boolean;
  createdAt: string;
  updatedAt: string;
};

export const ACTION_SYSTEMS: { value: ActionSystem; label: string }[] = [
  { value: "hosting", label: "Hosting" },
  { value: "payment", label: "Payment" },
  { value: "ai", label: "AI Platform" },
  { value: "datacenter", label: "Data Center" },
  { value: "support", label: "Support" },
  { value: "general", label: "General" },
];

const TICKETS_KEY = "sovereign.admin.tickets";
const PAGES_KEY = "sovereign.admin.pages";
const PRODUCTS_KEY = "sovereign.admin.products";
const ACTIONS_KEY = "sovereign.admin.actions";

export const DEFAULT_PAGES: EditablePage[] = [
  { path: "/", name: "Orbit (Home)", title: "Orbit Navigation", description: "Immersive rotating circular page navigator — the site entry point.", published: true, updatedAt: new Date().toISOString() },
  { path: "/home", name: "Home", title: "Sovereign Infrastructure", description: "Enterprise hosting, payments, AI, and data center solutions.", published: true, updatedAt: new Date().toISOString() },
  { path: "/products", name: "Hosting", title: "Cloud VPS", description: "High-performance virtual servers and compute products.", published: true, updatedAt: new Date().toISOString() },
  { path: "/dedicated", name: "Dedicated", title: "Dedicated Servers", description: "Bare metal infrastructure for intensive workloads.", published: true, updatedAt: new Date().toISOString() },
  { path: "/cloud", name: "Cloud", title: "Cloud Solutions", description: "Private, hybrid, and multi-cloud fabric.", published: true, updatedAt: new Date().toISOString() },
  { path: "/colocation", name: "Colocation", title: "Global Colocation", description: "Rack, cage, private suite, and cross-connect services.", published: true, updatedAt: new Date().toISOString() },
  { path: "/payment", name: "Payment", title: "Payment Gateway", description: "Accept global payments with enterprise-grade security.", published: true, updatedAt: new Date().toISOString() },
  { path: "/topup", name: "Top-Up", title: "Wallet Top-Up", description: "Slip-verified wallet recharge with bank reconciliation.", published: true, updatedAt: new Date().toISOString() },
  { path: "/ai", name: "AI Platform", title: "Sovereign AI Platform", description: "Automation and analytics for infrastructure teams.", published: true, updatedAt: new Date().toISOString() },
  { path: "/datacenter", name: "Data Center", title: "Data Centers", description: "Tier IV facilities and data center operations.", published: true, updatedAt: new Date().toISOString() },
  { path: "/organizations", name: "Organizations", title: "Organization Management", description: "Teams, roles, audit logs, and enterprise controls.", published: true, updatedAt: new Date().toISOString() },
  { path: "/about", name: "About", title: "Bold & Sovereign", description: "Company story, values, and leadership.", published: true, updatedAt: new Date().toISOString() },
  { path: "/contact", name: "Contact", title: "Get in touch", description: "Sales and support contact page.", published: true, updatedAt: new Date().toISOString() },
  { path: "/status", name: "Status", title: "System Status", description: "Operational health and incidents.", published: true, updatedAt: new Date().toISOString() },
  { path: "/privacy", name: "Privacy", title: "Privacy Policy", description: "Privacy policy demo page.", published: true, updatedAt: new Date().toISOString() },
  { path: "/terms", name: "Terms", title: "Terms of Service", description: "Terms of service demo page.", published: true, updatedAt: new Date().toISOString() },
  { path: "/compliance", name: "Compliance", title: "Compliance", description: "Trust and compliance demo page.", published: true, updatedAt: new Date().toISOString() },
];

export const DEFAULT_PRODUCTS: ProductPlan[] = [
  { id: "nano", name: "Nano", category: "vps", description: "Small app and staging instance.", vcpu: 1, ram: 1, storage: 20, bandwidth: 1, price: 6, badge: "", active: true, updatedAt: new Date().toISOString() },
  { id: "micro", name: "Micro", category: "vps", description: "Entry production VPS for lightweight workloads.", vcpu: 2, ram: 2, storage: 40, bandwidth: 2, price: 12, badge: "", active: true, updatedAt: new Date().toISOString() },
  { id: "small", name: "Small", category: "vps", description: "Balanced compute for small services.", vcpu: 2, ram: 4, storage: 80, bandwidth: 3, price: 20, badge: "", active: true, updatedAt: new Date().toISOString() },
  { id: "medium", name: "Medium", category: "vps", description: "Popular production instance.", vcpu: 4, ram: 8, storage: 160, bandwidth: 5, price: 40, badge: "Popular", active: true, updatedAt: new Date().toISOString() },
  { id: "large", name: "Large", category: "vps", description: "High performance web and API workloads.", vcpu: 8, ram: 16, storage: 320, bandwidth: 8, price: 80, badge: "", active: true, updatedAt: new Date().toISOString() },
  { id: "xl", name: "XL", category: "vps", description: "Large memory and sustained traffic.", vcpu: 16, ram: 32, storage: 640, bandwidth: 10, price: 160, badge: "", active: true, updatedAt: new Date().toISOString() },
  { id: "xxl", name: "XXL", category: "dedicated", description: "Enterprise-grade dedicated resources.", vcpu: 32, ram: 64, storage: 1280, bandwidth: 15, price: 320, badge: "Enterprise", active: true, updatedAt: new Date().toISOString() },
  { id: "titan", name: "Titan", category: "dedicated", description: "Maximum compute for intensive systems.", vcpu: 64, ram: 128, storage: 2560, bandwidth: 25, price: 640, badge: "", active: true, updatedAt: new Date().toISOString() },
];

export const DEFAULT_ACTIONS: CustomAction[] = [
  { id: "act-orbit", label: "Orbit Navigation", description: "Immersive rotating page navigator.", url: "/orbit", system: "general", color: "#9b59ff", newTab: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "act-topup", label: "Wallet Top-Up", description: "Slip-verified wallet recharge.", url: "/topup", system: "payment", color: "#00ffcc", newTab: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "act-tickets", label: "Open Support Tickets", description: "Jump to the support inbox.", url: "/contact", system: "support", color: "#ff7a90", newTab: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "act-status", label: "System Status", description: "Live operational health.", url: "/status", system: "support", color: "#7cffcb", newTab: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "act-payment", label: "Payment Console", description: "Open the payment demo surface.", url: "/payment", system: "payment", color: "#00ffcc", newTab: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "act-hosting", label: "Hosting Plans", description: "Manage VPS & dedicated plans.", url: "/products", system: "hosting", color: "#00d4ff", newTab: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "act-ai", label: "AI Platform", description: "Open the AI workspace.", url: "/ai", system: "ai", color: "#9b59ff", newTab: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

function readJson<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("sovereign-admin-store"));
}

export function getTickets(): SupportTicket[] {
  return readJson<SupportTicket[]>(TICKETS_KEY, []);
}

export function createTicket(input: Pick<SupportTicket, "name" | "email" | "message">): SupportTicket {
  const now = new Date().toISOString();
  const ticket: SupportTicket = {
    ...input,
    id: `TCK-${Date.now().toString(36).toUpperCase()}`,
    status: "new",
    createdAt: now,
    updatedAt: now,
  };
  writeJson(TICKETS_KEY, [ticket, ...getTickets()]);
  return ticket;
}

export function updateTicket(id: string, patch: Partial<SupportTicket>): SupportTicket[] {
  const tickets = getTickets().map((ticket) =>
    ticket.id === id ? { ...ticket, ...patch, updatedAt: new Date().toISOString() } : ticket,
  );
  writeJson(TICKETS_KEY, tickets);
  return tickets;
}

export function getPages(): EditablePage[] {
  const saved = readJson<EditablePage[]>(PAGES_KEY, []);
  const merged = DEFAULT_PAGES.map((page) => saved.find((item) => item.path === page.path) ?? page);
  return merged;
}

export function updatePage(path: string, patch: Partial<EditablePage>): EditablePage[] {
  const pages = getPages().map((page) =>
    page.path === path ? { ...page, ...patch, updatedAt: new Date().toISOString() } : page,
  );
  writeJson(PAGES_KEY, pages);
  return pages;
}

export function resetPages(): EditablePage[] {
  localStorage.removeItem(PAGES_KEY);
  window.dispatchEvent(new Event("sovereign-admin-store"));
  return getPages();
}

export function getProducts(): ProductPlan[] {
  const saved = readJson<ProductPlan[]>(PRODUCTS_KEY, []);
  return saved.length ? saved : DEFAULT_PRODUCTS;
}

export function saveProducts(products: ProductPlan[]): ProductPlan[] {
  writeJson(PRODUCTS_KEY, products);
  return products;
}

export function createProduct(input?: Partial<ProductPlan>): ProductPlan[] {
  const now = new Date().toISOString();
  const product: ProductPlan = {
    id: `plan-${Date.now().toString(36)}`,
    name: input?.name ?? "New Plan",
    category: input?.category ?? "vps",
    description: input?.description ?? "Describe this product plan.",
    vcpu: input?.vcpu ?? 2,
    ram: input?.ram ?? 4,
    storage: input?.storage ?? 80,
    bandwidth: input?.bandwidth ?? 3,
    price: input?.price ?? 25,
    badge: input?.badge ?? "",
    active: input?.active ?? true,
    updatedAt: now,
  };
  return saveProducts([product, ...getProducts()]);
}

export function updateProduct(id: string, patch: Partial<ProductPlan>): ProductPlan[] {
  return saveProducts(
    getProducts().map((product) =>
      product.id === id ? { ...product, ...patch, updatedAt: new Date().toISOString() } : product,
    ),
  );
}

export function deleteProduct(id: string): ProductPlan[] {
  return saveProducts(getProducts().filter((product) => product.id !== id));
}

export function resetProducts(): ProductPlan[] {
  localStorage.removeItem(PRODUCTS_KEY);
  window.dispatchEvent(new Event("sovereign-admin-store"));
  return getProducts();
}

export function getActions(): CustomAction[] {
  const saved = readJson<CustomAction[]>(ACTIONS_KEY, []);
  return saved.length ? saved : DEFAULT_ACTIONS;
}

export function saveActions(actions: CustomAction[]): CustomAction[] {
  writeJson(ACTIONS_KEY, actions);
  return actions;
}

export function createAction(input?: Partial<CustomAction>): CustomAction[] {
  const now = new Date().toISOString();
  const action: CustomAction = {
    id: `act-${Date.now().toString(36)}`,
    label: input?.label ?? "New Button",
    description: input?.description ?? "",
    url: input?.url ?? "/",
    system: input?.system ?? "general",
    color: input?.color ?? "#00d4ff",
    newTab: input?.newTab ?? false,
    createdAt: now,
    updatedAt: now,
  };
  return saveActions([...getActions(), action]);
}

export function updateAction(id: string, patch: Partial<CustomAction>): CustomAction[] {
  return saveActions(
    getActions().map((action) =>
      action.id === id ? { ...action, ...patch, updatedAt: new Date().toISOString() } : action,
    ),
  );
}

export function deleteAction(id: string): CustomAction[] {
  return saveActions(getActions().filter((action) => action.id !== id));
}

export function resetActions(): CustomAction[] {
  localStorage.removeItem(ACTIONS_KEY);
  window.dispatchEvent(new Event("sovereign-admin-store"));
  return getActions();
}
