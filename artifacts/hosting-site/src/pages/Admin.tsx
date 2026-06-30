import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, CheckCircle2, ExternalLink, FilePenLine, Inbox, LayoutDashboard, PackagePlus, Plus, Rocket, Shield, TicketCheck, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { canManageEverything, getAdminRankLabel, getDemoUser } from "@/lib/demo-auth";
import { ACTION_SYSTEMS, ActionSystem, createAction, createProduct, CustomAction, deleteAction, deleteProduct, EditablePage, getActions, getPages, getProducts, getTickets, ProductPlan, resetActions, resetPages, resetProducts, SupportTicket, TicketStatus, updateAction, updatePage, updateProduct, updateTicket } from "@/lib/admin-store";

type AdminTab = "overview" | "tickets" | "products" | "pages" | "launchpad";

const SYSTEM_LABELS: Record<ActionSystem, string> = ACTION_SYSTEMS.reduce(
  (acc, item) => ({ ...acc, [item.value]: item.label }),
  {} as Record<ActionSystem, string>,
);

const STATUS_LABELS: Record<TicketStatus, string> = {
  new: "New",
  accepted: "Accepted",
  in_progress: "In Progress",
  resolved: "Resolved",
};

function statusClass(status: TicketStatus) {
  if (status === "new") return "border-blue-400/30 bg-blue-400/10 text-blue-300";
  if (status === "accepted") return "border-cyan-400/30 bg-cyan-400/10 text-cyan-300";
  if (status === "in_progress") return "border-orange-400/30 bg-orange-400/10 text-orange-300";
  return "border-green-400/30 bg-green-400/10 text-green-300";
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const user = getDemoUser();
  const [tab, setTab] = useState<AdminTab>("overview");
  const [tickets, setTickets] = useState<SupportTicket[]>(() => getTickets());
  const [pages, setPages] = useState<EditablePage[]>(() => getPages());
  const [products, setProducts] = useState<ProductPlan[]>(() => getProducts());
  const [actions, setActions] = useState<CustomAction[]>(() => getActions());
  const [selectedPath, setSelectedPath] = useState(() => getPages()[0]?.path ?? "/");
  const emptyDraft = { label: "", url: "", system: "general" as ActionSystem, color: "#00d4ff", newTab: false };
  const [draft, setDraft] = useState(emptyDraft);

  useEffect(() => {
    const sync = () => {
      setTickets(getTickets());
      setPages(getPages());
      setProducts(getProducts());
      setActions(getActions());
    };

    window.addEventListener("sovereign-admin-store", sync);
    return () => window.removeEventListener("sovereign-admin-store", sync);
  }, []);

  const selectedPage = pages.find((page) => page.path === selectedPath) ?? pages[0];
  const ticketCounts = useMemo(() => {
    return {
      total: tickets.length,
      open: tickets.filter((ticket) => ticket.status !== "resolved").length,
      new: tickets.filter((ticket) => ticket.status === "new").length,
      resolved: tickets.filter((ticket) => ticket.status === "resolved").length,
    };
  }, [tickets]);
  const rankLabel = getAdminRankLabel(user?.rank);
  const fullAccess = canManageEverything(user);

  if (user?.role !== "admin") {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#161616] p-8 text-center">
          <Shield className="mx-auto mb-5 h-12 w-12 text-[var(--neon-blue)]" />
          <h1 className="mb-3 text-3xl font-bold">Admin access required</h1>
          <p className="mb-6 text-muted-foreground">Sign in with the admin account to manage pages and support tickets.</p>
          <Button onClick={() => setLocation("/login")} className="rounded-full px-6">Go to Login</Button>
        </div>
      </DashboardLayout>
    );
  }

  const updateSelectedPage = (patch: Partial<EditablePage>) => {
    if (!selectedPage) return;
    setPages(updatePage(selectedPage.path, patch));
  };

  const changeTicket = (id: string, patch: Partial<SupportTicket>) => {
    setTickets(updateTicket(id, patch));
  };

  const changeProduct = (id: string, patch: Partial<ProductPlan>) => {
    setProducts(updateProduct(id, patch));
  };

  const changeAction = (id: string, patch: Partial<CustomAction>) => {
    setActions(updateAction(id, patch));
  };

  const addDraftAction = () => {
    const label = draft.label.trim();
    const url = draft.url.trim();
    if (!label || !url) return;
    setActions(createAction({ ...draft, label, url }));
    setDraft(emptyDraft);
  };

  const launchAction = (action: CustomAction) => {
    const isExternal = /^https?:\/\//i.test(action.url);
    if (isExternal || action.newTab) {
      window.open(action.url, isExternal ? "_blank" : "_self", isExternal ? "noopener,noreferrer" : "");
      return;
    }
    setLocation(action.url);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Shield className="h-4 w-4 text-[var(--neon-blue)]" />
            {rankLabel}
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Sovereign Control Center</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {fullAccess ? "Full system access: manage tickets, products, pages, and operations." : "Limited admin access."}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:justify-end">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "tickets", label: "Tickets", icon: Inbox },
            { id: "products", label: "Products", icon: PackagePlus },
            { id: "pages", label: "Pages", icon: FilePenLine },
            { id: "launchpad", label: "Launchpad", icon: Rocket },
          ].map((item) => (
            <Button
              key={item.id}
              type="button"
              variant={tab === item.id ? "default" : "outline"}
              onClick={() => setTab(item.id as AdminTab)}
              className={tab === item.id ? "rounded-full" : "rounded-full border-white/15 text-white"}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {tab === "overview" && (
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {[
              { label: "Total Tickets", value: ticketCounts.total, icon: Inbox },
              { label: "Open Tickets", value: ticketCounts.open, icon: TicketCheck },
              { label: "New Tickets", value: ticketCounts.new, icon: Inbox },
              { label: "Editable Pages", value: pages.length, icon: FilePenLine },
              { label: "Products", value: products.length, icon: PackagePlus },
            ].map((stat) => (
              <Card key={stat.label} className="border-white/10 bg-[#161616] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <stat.icon className="h-5 w-5 text-white/50" />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </Card>
            ))}
          </div>

          <Card className="border-white/10 bg-[#161616] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Quick Launch</h2>
              <Button type="button" variant="outline" onClick={() => setTab("launchpad")} className="h-8 rounded-full border-white/15 px-3 text-xs text-white">
                Manage
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </div>
            {actions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No buttons yet. Add some from the Launchpad tab.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {actions.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => launchAction(action)}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-colors hover:bg-white/[0.07]"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="h-8 w-8 shrink-0 rounded-lg" style={{ backgroundColor: `${action.color}22`, border: `1px solid ${action.color}55` }}>
                        <Rocket className="m-auto mt-2 h-4 w-4" style={{ color: action.color }} />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-medium">{action.label}</span>
                        <span className="block truncate text-xs text-muted-foreground">{SYSTEM_LABELS[action.system]} / {action.url}</span>
                      </span>
                    </span>
                    {/^https?:\/\//i.test(action.url) ? <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" /> : <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                  </button>
                ))}
              </div>
            )}
          </Card>

          <Card className="border-white/10 bg-[#161616] p-6">
            <h2 className="mb-5 text-xl font-bold">Recent Tickets</h2>
            <div className="space-y-3">
              {tickets.slice(0, 5).map((ticket) => (
                <button key={ticket.id} onClick={() => setTab("tickets")} className="flex w-full flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left hover:bg-white/[0.06] sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-medium">{ticket.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{ticket.id} / {ticket.email}</p>
                  </div>
                  <Badge variant="outline" className={statusClass(ticket.status)}>{STATUS_LABELS[ticket.status]}</Badge>
                </button>
              ))}
              {tickets.length === 0 && <p className="text-sm text-muted-foreground">No tickets yet. Submit one from the Contact page.</p>}
            </div>
          </Card>
        </div>
      )}

      {tab === "tickets" && (
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="border-white/10 bg-[#161616] p-5">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold">{ticket.name}</h2>
                    <Badge variant="outline" className={statusClass(ticket.status)}>{STATUS_LABELS[ticket.status]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{ticket.id} / {ticket.email} / {new Date(ticket.createdAt).toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
                  <Button type="button" onClick={() => changeTicket(ticket.id, { status: "accepted", assignee: user.name })} className="rounded-full">Accept</Button>
                  <Button type="button" variant="outline" onClick={() => changeTicket(ticket.id, { status: "in_progress", assignee: user.name })} className="rounded-full border-white/15 text-white">In Progress</Button>
                  <Button type="button" variant="outline" onClick={() => changeTicket(ticket.id, { status: "resolved" })} className="rounded-full border-white/15 text-white">Resolve</Button>
                </div>
              </div>
              <p className="mb-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-relaxed text-white/82">{ticket.message}</p>
              <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
                <Textarea
                  value={ticket.reply ?? ""}
                  onChange={(event) => changeTicket(ticket.id, { reply: event.target.value })}
                  placeholder="Write an internal/admin reply..."
                  className="min-h-20 border-white/10 bg-black/30"
                />
                <Button type="button" onClick={() => changeTicket(ticket.id, { status: "resolved" })} className="min-h-12 rounded-xl lg:h-full">
                  <CheckCircle2 className="h-4 w-4" />
                  Save Reply
                </Button>
              </div>
            </Card>
          ))}
          {tickets.length === 0 && (
            <Card className="border-white/10 bg-[#161616] p-8 text-center">
              <Inbox className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-bold">No tickets</h2>
              <p className="text-sm text-muted-foreground">Tickets from the Contact form will appear here.</p>
            </Card>
          )}
        </div>
      )}

      {tab === "products" && (
        <div className="space-y-5">
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#161616] p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Products & Plans</h2>
              <p className="text-sm text-muted-foreground">Add, edit, publish, and remove every sellable product in the demo catalog.</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <Button type="button" onClick={() => setProducts(createProduct())} className="rounded-full">
                <PackagePlus className="h-4 w-4" />
                Add Product
              </Button>
              <Button type="button" variant="outline" onClick={() => setProducts(resetProducts())} className="rounded-full border-white/15 text-white">Reset</Button>
            </div>
          </div>

          <div className="grid gap-4">
            {products.map((product) => (
              <Card key={product.id} className="border-white/10 bg-[#161616] p-4 sm:p-5">
                <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <Badge variant="outline" className={product.active ? "border-green-400/30 bg-green-400/10 text-green-300" : "border-white/15 text-muted-foreground"}>
                        {product.active ? "Active" : "Hidden"}
                      </Badge>
                      {product.badge ? <Badge variant="outline" className="border-[var(--neon-blue)]/30 bg-[var(--neon-blue)]/10 text-[var(--neon-blue)]">{product.badge}</Badge> : null}
                    </div>
                    <p className="text-xs text-muted-foreground">{product.id} / updated {new Date(product.updatedAt).toLocaleString()}</p>
                  </div>
                  <Button type="button" variant="outline" onClick={() => setProducts(deleteProduct(product.id))} className="w-full rounded-full border-red-400/30 text-red-300 sm:w-auto">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium">Product name</label>
                    <Input value={product.name} onChange={(event) => changeProduct(product.id, { name: event.target.value })} className="border-white/10 bg-black/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select value={product.category} onChange={(event) => changeProduct(product.id, { category: event.target.value as ProductPlan["category"] })} className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-sm">
                      <option value="vps">VPS</option>
                      <option value="dedicated">Dedicated</option>
                      <option value="cloud">Cloud</option>
                      <option value="colocation">Colocation</option>
                      <option value="payment">Payment</option>
                      <option value="ai">AI</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Badge</label>
                    <Input value={product.badge} onChange={(event) => changeProduct(product.id, { badge: event.target.value })} placeholder="Popular" className="border-white/10 bg-black/30" />
                  </div>
                  <div className="space-y-2 sm:col-span-2 xl:col-span-4">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea value={product.description} onChange={(event) => changeProduct(product.id, { description: event.target.value })} className="min-h-20 border-white/10 bg-black/30" />
                  </div>
                  {[
                    ["vcpu", "vCPU"],
                    ["ram", "RAM GB"],
                    ["storage", "Storage GB"],
                    ["bandwidth", "Bandwidth TB"],
                    ["price", "Price / month"],
                  ].map(([field, label]) => (
                    <div key={field} className="space-y-2">
                      <label className="text-sm font-medium">{label}</label>
                      <Input
                        type="number"
                        min="0"
                        value={product[field as keyof ProductPlan] as number}
                        onChange={(event) => changeProduct(product.id, { [field]: Number(event.target.value) } as Partial<ProductPlan>)}
                        className="border-white/10 bg-black/30"
                      />
                    </div>
                  ))}
                  <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm">
                    <input type="checkbox" checked={product.active} onChange={(event) => changeProduct(product.id, { active: event.target.checked })} />
                    Active on storefront
                  </label>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "pages" && selectedPage && (
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <Card className="border-white/10 bg-[#161616] p-3">
            <div className="mb-3 flex items-center justify-between px-2">
              <h2 className="font-bold">Pages</h2>
              <Button type="button" variant="outline" onClick={() => setPages(resetPages())} className="h-8 rounded-full border-white/15 px-3 text-xs text-white">Reset</Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
              {pages.map((page) => (
                <button
                  key={page.path}
                  onClick={() => setSelectedPath(page.path)}
                  className={`flex min-w-44 shrink-0 items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors lg:w-full ${selectedPath === page.path ? "bg-white text-black" : "text-muted-foreground hover:bg-white/5 hover:text-white"}`}
                >
                  <span>{page.name}</span>
                  <span className="text-xs opacity-70">{page.path}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="border-white/10 bg-[#161616] p-4 sm:p-6">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedPage.name}</h2>
                <p className="text-sm text-muted-foreground">Editing {selectedPage.path}</p>
              </div>
              <Link href={selectedPage.path}>
                <Button variant="outline" className="rounded-full border-white/15 text-white">Preview Page</Button>
              </Link>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Page title</label>
                <Input value={selectedPage.title} onChange={(event) => updateSelectedPage({ title: event.target.value })} className="border-white/10 bg-black/30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea value={selectedPage.description} onChange={(event) => updateSelectedPage({ description: event.target.value })} className="min-h-28 border-white/10 bg-black/30" />
              </div>
              <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm">
                <input type="checkbox" checked={selectedPage.published} onChange={(event) => updateSelectedPage({ published: event.target.checked })} />
                Published and visible in admin inventory
              </label>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Saved Preview</p>
                <h3 className="text-2xl font-bold">{selectedPage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selectedPage.description}</p>
                <p className="mt-4 text-xs text-muted-foreground">Updated: {new Date(selectedPage.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {tab === "launchpad" && (
        <div className="space-y-6">
          <Card className="border-white/10 bg-[#161616] p-4 sm:p-6">
            <div className="mb-5 flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Launchpad</h2>
              <p className="text-sm text-muted-foreground">Build your own buttons and attach them to any system. Internal paths (e.g. <code className="text-white/70">/payment</code>) navigate in-app; full URLs open the destination.</p>
            </div>

            <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 lg:grid-cols-[1.4fr_1.4fr_1fr_auto_auto]">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Label</label>
                <Input value={draft.label} onChange={(event) => setDraft((d) => ({ ...d, label: event.target.value }))} placeholder="Open billing" className="border-white/10 bg-black/30" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">URL / path</label>
                <Input value={draft.url} onChange={(event) => setDraft((d) => ({ ...d, url: event.target.value }))} placeholder="/payment or https://..." className="border-white/10 bg-black/30" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">System</label>
                <select value={draft.system} onChange={(event) => setDraft((d) => ({ ...d, system: event.target.value as ActionSystem }))} className="h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 text-sm">
                  {ACTION_SYSTEMS.map((sys) => <option key={sys.value} value={sys.value}>{sys.label}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Color</label>
                <input type="color" value={draft.color} onChange={(event) => setDraft((d) => ({ ...d, color: event.target.value }))} className="h-10 w-full cursor-pointer rounded-md border border-white/10 bg-black/30" />
              </div>
              <div className="flex items-end">
                <Button type="button" onClick={addDraftAction} disabled={!draft.label.trim() || !draft.url.trim()} className="h-10 w-full rounded-full lg:w-auto">
                  <Plus className="h-4 w-4" />
                  Add Button
                </Button>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked={draft.newTab} onChange={(event) => setDraft((d) => ({ ...d, newTab: event.target.checked }))} />
                Open in a new tab
              </label>
              <Button type="button" variant="outline" onClick={() => setActions(resetActions())} className="h-8 rounded-full border-white/15 px-3 text-xs text-white">Reset to defaults</Button>
            </div>
          </Card>

          {ACTION_SYSTEMS.filter((sys) => actions.some((action) => action.system === sys.value)).map((sys) => (
            <div key={sys.value} className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">{sys.label}</h3>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {actions.filter((action) => action.system === sys.value).map((action) => (
                  <Card key={action.id} className="border-white/10 bg-[#161616] p-4">
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="h-9 w-9 shrink-0 rounded-lg" style={{ backgroundColor: `${action.color}22`, border: `1px solid ${action.color}55` }}>
                          <Rocket className="m-auto mt-2.5 h-4 w-4" style={{ color: action.color }} />
                        </span>
                        <span className="truncate font-semibold">{action.label || "Untitled"}</span>
                      </div>
                      <Button type="button" variant="outline" onClick={() => setActions(deleteAction(action.id))} className="h-8 w-8 shrink-0 rounded-full border-red-400/30 p-0 text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Input value={action.label} onChange={(event) => changeAction(action.id, { label: event.target.value })} placeholder="Label" className="h-9 border-white/10 bg-black/30" />
                      <Input value={action.url} onChange={(event) => changeAction(action.id, { url: event.target.value })} placeholder="/path or https://..." className="h-9 border-white/10 bg-black/30" />
                      <div className="flex gap-2">
                        <select value={action.system} onChange={(event) => changeAction(action.id, { system: event.target.value as ActionSystem })} className="h-9 flex-1 rounded-md border border-white/10 bg-black/30 px-2 text-sm">
                          {ACTION_SYSTEMS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                        <input type="color" value={action.color} onChange={(event) => changeAction(action.id, { color: event.target.value })} className="h-9 w-12 cursor-pointer rounded-md border border-white/10 bg-black/30" />
                      </div>
                      <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        <input type="checkbox" checked={action.newTab} onChange={(event) => changeAction(action.id, { newTab: event.target.checked })} />
                        Open in a new tab
                      </label>
                    </div>
                    <Button type="button" onClick={() => launchAction(action)} className="mt-3 w-full rounded-full">
                      Launch
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {actions.length === 0 && (
            <Card className="border-white/10 bg-[#161616] p-8 text-center">
              <Rocket className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-bold">No buttons yet</h2>
              <p className="text-sm text-muted-foreground">Use the form above to add your first custom button.</p>
            </Card>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
