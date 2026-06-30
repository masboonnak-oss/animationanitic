import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Banknote, CheckCircle2, Loader2, ShieldCheck, Upload, Wallet, XCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Base URL of the standalone top-up backend (the "ระบบเติมเงิน" repo).
// In dev this is proxied to http://localhost:3000 by vite.config.ts.
const API = (import.meta.env.VITE_TOPUP_API as string | undefined) ?? "/topup-api";

const BANKS = ["KBANK", "SCB", "BBL", "KTB", "BAY", "TTB", "GSB"];
const USERS = [
  { id: 1, name: "nara" },
  { id: 2, name: "somchai" },
];

type Tx = {
  id: number;
  status: "PENDING" | "SUCCESS" | "SUSPICIOUS" | string;
  slip_trans_id?: string | null;
  amount_ocr?: number | null;
  amount_actual?: number | null;
  bank_provider?: string | null;
  extract_method?: string | null;
  matched_rule?: string | null;
};

type BalanceResp = {
  user: { id: number; username: string; balance: number };
  transactions: Tx[];
};

function statusBadge(status: string) {
  if (status === "SUCCESS") return "border-green-400/30 bg-green-400/10 text-green-300";
  if (status === "SUSPICIOUS") return "border-red-400/30 bg-red-400/10 text-red-300";
  return "border-orange-400/30 bg-orange-400/10 text-orange-300";
}

export default function Topup() {
  const [online, setOnline] = useState<boolean | null>(null);
  const [userId, setUserId] = useState(1);
  const [amount, setAmount] = useState("120.00");
  const [bank, setBank] = useState("KBANK");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [tx, setTx] = useState<Tx | null>(null);
  const [polling, setPolling] = useState(false);
  const [balance, setBalance] = useState<BalanceResp | null>(null);
  const [message, setMessage] = useState<{ kind: "info" | "error"; text: string } | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadBalance = useCallback(async (id: number) => {
    try {
      const res = await fetch(`${API}/api/users/${id}/balance`);
      if (!res.ok) return;
      setBalance((await res.json()) as BalanceResp);
    } catch {
      /* backend offline — surfaced by the health check */
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch(`${API}/api/health`)
      .then((res) => active && setOnline(res.ok))
      .catch(() => active && setOnline(false));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    loadBalance(userId);
  }, [userId, loadBalance]);

  useEffect(() => () => {
    if (pollRef.current) clearInterval(pollRef.current);
  }, []);

  const startPolling = useCallback(
    (id: number) => {
      if (pollRef.current) clearInterval(pollRef.current);
      setPolling(true);
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(`${API}/api/topup/${id}`);
          if (!res.ok) return;
          const data = await res.json();
          setTx(data.transaction as Tx);
          if (data.done) {
            if (pollRef.current) clearInterval(pollRef.current);
            pollRef.current = null;
            setPolling(false);
            loadBalance(userId);
          }
        } catch {
          /* keep polling; transient network error */
        }
      }, 2500);
    },
    [userId, loadBalance],
  );

  const submit = async () => {
    if (!file) {
      setMessage({ kind: "error", text: "Please choose a slip image (.jpg / .png) first." });
      return;
    }
    setSubmitting(true);
    setMessage(null);
    setTx(null);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("user_id", String(userId));
      body.append("amount", amount);
      body.append("bank_provider", bank);

      const res = await fetch(`${API}/api/topup`, { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ kind: "error", text: data.message || data.error || "Upload failed." });
        return;
      }
      setTx(data.transaction as Tx);
      setMessage({ kind: "info", text: data.message || "Slip received, awaiting bank settlement." });
      startPolling(data.transaction.id);
    } catch {
      setMessage({ kind: "error", text: "Could not reach the top-up service. Is it running on port 3000?" });
    } finally {
      setSubmitting(false);
    }
  };

  const simulateBankEmail = async () => {
    if (!tx) return;
    try {
      await fetch(`${API}/api/test/bank-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bank_tx_id: tx.slip_trans_id, amount: Number(amount), bank_provider: bank }),
      });
      setMessage({ kind: "info", text: "Bank email injected — the worker will reconcile shortly." });
      if (!polling) startPolling(tx.id);
    } catch {
      setMessage({ kind: "error", text: "Failed to inject bank email." });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-28 sm:px-6 md:pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-[var(--neon-blue)]" />
            Double-verified top-up
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Wallet Top-Up</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Upload a payment slip — it is verified by Mini-QR + OCR and reconciled against the bank settlement before your wallet is credited.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className={`h-2.5 w-2.5 rounded-full ${online === null ? "bg-white/30" : online ? "bg-green-400" : "bg-red-400"}`} />
            <span className="text-muted-foreground">
              {online === null ? "Checking service…" : online ? "Top-up service connected" : "Top-up service offline (start it on :3000)"}
            </span>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Upload form */}
          <div className="rounded-2xl border border-white/10 bg-[#161616] p-5 sm:p-7">
            <h2 className="mb-5 text-xl font-bold">Submit a slip</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Account</label>
                <select value={userId} onChange={(e) => setUserId(Number(e.target.value))} className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-sm">
                  {USERS.map((u) => <option key={u.id} value={u.id}>#{u.id} · {u.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bank</label>
                <select value={bank} onChange={(e) => setBank(e.target.value)} className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-sm">
                  {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount (THB)</label>
                <Input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className="border-white/10 bg-black/30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Slip image</label>
                <label className="flex h-10 cursor-pointer items-center gap-2 rounded-md border border-dashed border-white/15 bg-black/30 px-3 text-sm text-muted-foreground hover:border-white/30">
                  <Upload className="h-4 w-4" />
                  <span className="truncate">{file ? file.name : "Choose .jpg / .png"}</span>
                  <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                </label>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button type="button" onClick={submit} disabled={submitting || online === false} className="rounded-full">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Banknote className="h-4 w-4" />}
                {submitting ? "Submitting…" : "Verify & Top-Up"}
              </Button>
              {tx && tx.status === "PENDING" ? (
                <Button type="button" variant="outline" onClick={simulateBankEmail} className="rounded-full border-white/15 text-white">
                  Simulate bank email
                </Button>
              ) : null}
            </div>

            {message ? (
              <p className={`mt-4 rounded-xl border p-3 text-sm ${message.kind === "error" ? "border-red-400/30 bg-red-400/10 text-red-200" : "border-white/10 bg-white/5 text-white/80"}`}>
                {message.text}
              </p>
            ) : null}

            {tx ? (
              <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Transaction #{tx.id}</span>
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${statusBadge(tx.status)}`}>
                    {tx.status === "SUCCESS" ? <CheckCircle2 className="h-3.5 w-3.5" /> : tx.status === "SUSPICIOUS" ? <XCircle className="h-3.5 w-3.5" /> : <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    {tx.status}
                  </span>
                </div>
                <dl className="grid grid-cols-2 gap-y-2 text-sm">
                  <dt className="text-muted-foreground">Amount</dt>
                  <dd className="text-right">{tx.amount_ocr != null ? `฿${tx.amount_ocr.toLocaleString()}` : "—"}</dd>
                  <dt className="text-muted-foreground">Slip ref</dt>
                  <dd className="truncate text-right">{tx.slip_trans_id || "—"}</dd>
                  <dt className="text-muted-foreground">Method</dt>
                  <dd className="text-right">{tx.extract_method || "—"}</dd>
                  {tx.matched_rule ? (<><dt className="text-muted-foreground">Matched rule</dt><dd className="text-right">{tx.matched_rule}</dd></>) : null}
                </dl>
              </div>
            ) : null}
          </div>

          {/* Wallet */}
          <div className="rounded-2xl border border-white/10 bg-[#161616] p-5 sm:p-7">
            <div className="mb-4 flex items-center gap-2">
              <Wallet className="h-5 w-5 text-[var(--neon-blue)]" />
              <h2 className="text-xl font-bold">Wallet</h2>
            </div>
            <p className="text-sm text-muted-foreground">{balance?.user.username ?? USERS.find((u) => u.id === userId)?.name}</p>
            <p className="mt-1 text-4xl font-bold tracking-tight">฿{(balance?.user.balance ?? 0).toLocaleString()}</p>

            <h3 className="mb-2 mt-6 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Recent</h3>
            <div className="space-y-2">
              {balance?.transactions.slice(0, 6).map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm">
                  <span className="text-muted-foreground">#{t.id}</span>
                  <span>{t.amount_ocr != null ? `฿${t.amount_ocr.toLocaleString()}` : "—"}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-xs ${statusBadge(t.status)}`}>{t.status}</span>
                </div>
              ))}
              {!balance?.transactions.length ? <p className="text-sm text-muted-foreground">No transactions yet.</p> : null}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
