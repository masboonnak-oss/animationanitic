import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, LogOut, ShieldCheck } from "lucide-react";
import {
  clearDemoSession,
  demoAdminLogin,
  demoLogin,
  getAdminRankLabel,
  getDemoUser,
  makeDemoUser,
  saveDemoSession,
  type DemoUser,
} from "@/lib/demo-auth";

// Real, working auth forms embedded inside Triangle-Core leaf panels.
// They drive the existing demo-auth session (no backend change).

const inputCls =
  "w-full rounded-lg bg-black/45 border border-white/15 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/45";
const btnCls = "w-full rounded-lg py-2.5 text-xs font-bold tracking-[0.18em] transition-transform hover:-translate-y-0.5";

function SignedIn({ user, onSignOut }: { user: DemoUser; onSignOut: () => void }) {
  const [, setLocation] = useLocation();
  const isAdmin = user.role === "admin";
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Signed in</p>
        <p className="mt-1 text-sm font-bold text-white/90">{user.name}</p>
        <p className="text-[11px] text-white/45">{user.email}</p>
        {isAdmin ? <p className="mt-1 text-[11px] font-semibold text-[#FFC857]">{getAdminRankLabel(user.rank)}</p> : null}
      </div>
      {isAdmin ? (
        <button onClick={() => setLocation("/admin")} className={btnCls} style={{ background: "#FFC857", color: "#05070B" }} data-testid="button-open-admin">
          OPEN ADMIN CONSOLE
        </button>
      ) : null}
      <button onClick={onSignOut} className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 py-2.5 text-xs font-bold tracking-[0.18em] text-white/70 transition-colors hover:text-white">
        <LogOut className="h-3.5 w-3.5" />
        SIGN OUT
      </button>
    </div>
  );
}

export function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<DemoUser | null>(() => getDemoUser());

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = email.trim();
    if (!id || password.length < 1) {
      setError("Enter your email/username and password.");
      return;
    }
    // Mirror the original login: admin / admin123 → admin console.
    const isAdmin = id.toLowerCase() === "admin" && password === "admin123";
    const u = isAdmin ? demoAdminLogin() : demoLogin(id);
    saveDemoSession(u);
    setUser(u);
  };

  if (user) return <SignedIn user={user} onSignOut={() => { clearDemoSession(); setUser(null); }} />;

  return (
    <form onSubmit={submit} className="space-y-3">
      <input className={inputCls} type="text" placeholder="admin or you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="input-login-email" />
      <input className={inputCls} type="password" placeholder="password (admin123 for admin)" value={password} onChange={(e) => setPassword(e.target.value)} data-testid="input-login-password" />
      {error ? <p className="text-[11px] text-red-400">{error}</p> : null}
      <button type="submit" className={btnCls} style={{ background: "#E2E8F0", color: "#05070B" }} data-testid="button-login">
        SIGN IN
      </button>
    </form>
  );
}

export function RegisterCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<DemoUser | null>(() => getDemoUser());

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const v = email.trim();
    if (!n || !v) {
      setError("Enter your name and email.");
      return;
    }
    const u = makeDemoUser(n, v);
    saveDemoSession(u);
    setUser(u);
  };

  if (user) return <SignedIn user={user} onSignOut={() => { clearDemoSession(); setUser(null); }} />;

  return (
    <form onSubmit={submit} className="space-y-3">
      <input className={inputCls} type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} data-testid="input-register-name" />
      <input className={inputCls} type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="input-register-email" />
      {error ? <p className="text-[11px] text-red-400">{error}</p> : null}
      <button type="submit" className={btnCls} style={{ background: "#A0F0D0", color: "#05070B" }} data-testid="button-register">
        CREATE ACCOUNT
      </button>
    </form>
  );
}

export function AdminCard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<DemoUser | null>(() => getDemoUser());
  const isAdmin = user?.role === "admin";

  if (isAdmin && user) {
    return (
      <div className="space-y-3">
        <div className="rounded-lg border border-[#FFC857]/30 bg-[#FFC857]/[0.06] p-3">
          <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#FFC857]">
            <ShieldCheck className="h-3.5 w-3.5" /> {getAdminRankLabel(user.rank)}
          </p>
          <p className="mt-1 text-sm font-bold text-white/90">{user.name}</p>
        </div>
        <button onClick={() => setLocation("/admin")} className={`${btnCls} flex items-center justify-center gap-2`} style={{ background: "#FFC857", color: "#05070B" }} data-testid="button-open-admin-console">
          OPEN ADMIN CONSOLE <ArrowRight className="h-4 w-4" />
        </button>
        <button onClick={() => { clearDemoSession(); setUser(null); }} className="w-full rounded-lg border border-white/15 py-2.5 text-xs font-bold tracking-[0.18em] text-white/70 transition-colors hover:text-white">
          SIGN OUT
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs leading-relaxed text-white/55">
        Manage support tickets, products, editable pages, and the launchpad. Sign in with the admin demo account to continue.
      </p>
      <button
        onClick={() => { const u = demoAdminLogin(); saveDemoSession(u); setUser(u); }}
        className={`${btnCls} flex items-center justify-center gap-2`}
        style={{ background: "#FFC857", color: "#05070B" }}
        data-testid="button-admin-signin"
      >
        <ShieldCheck className="h-4 w-4" /> SIGN IN AS ADMIN
      </button>
    </div>
  );
}
