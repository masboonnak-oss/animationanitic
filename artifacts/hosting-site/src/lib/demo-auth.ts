export type AdminRank = "super_admin" | "admin" | "support";

export type DemoUser = {
  id: number;
  name: string;
  email: string;
  role: "customer" | "admin";
  rank?: AdminRank;
  createdAt: string;
};

const USER_KEY = "sovereign.demo.user";
const TOKEN_KEY = "sovereign.demo.token";
export const AUTH_EVENT = "sovereign-auth-session";

function emitAuthChange() {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function saveDemoSession(user: DemoUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, `demo-${user.id}-${Date.now()}`);
  emitAuthChange();
}

export function getDemoUser(): DemoUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    const user = JSON.parse(raw) as DemoUser;
    if (user.role === "admin" && !user.rank) {
      const upgraded = { ...user, rank: "super_admin" as AdminRank };
      localStorage.setItem(USER_KEY, JSON.stringify(upgraded));
      return upgraded;
    }
    return user;
  } catch {
    clearDemoSession();
    return null;
  }
}

export function clearDemoSession() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  emitAuthChange();
}

export function makeDemoUser(name: string, email: string): DemoUser {
  return {
    id: Math.floor(Date.now() / 1000),
    name,
    email,
    role: "customer",
    createdAt: new Date().toISOString(),
  };
}

export function demoLogin(email: string): DemoUser {
  const saved = getDemoUser();
  if (saved?.email.toLowerCase() === email.toLowerCase()) {
    return saved;
  }

  const name = email.split("@")[0]?.replace(/[._-]+/g, " ") || "Demo User";
  return makeDemoUser(
    name.replace(/\b\w/g, (letter) => letter.toUpperCase()),
    email,
  );
}

export function demoAdminLogin(): DemoUser {
  return {
    id: 1,
    name: "Sovereign Admin",
    email: "admin@sovereign.local",
    role: "admin",
    rank: "super_admin",
    createdAt: new Date().toISOString(),
  };
}

export function getAdminRankLabel(rank?: AdminRank) {
  if (rank === "super_admin") return "Super Admin";
  if (rank === "support") return "Support Admin";
  return "Admin";
}

export function canManageEverything(user: DemoUser | null) {
  return user?.role === "admin" && user.rank === "super_admin";
}
