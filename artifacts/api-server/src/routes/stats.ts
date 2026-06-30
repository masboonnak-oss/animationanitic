import { Router } from "express";
import { db, serversTable, ticketsTable } from "@workspace/db";
import { eq, count, sql } from "drizzle-orm";

const router = Router();

function getSessionUser(req: any): number | null {
  return req.session?.userId ?? null;
}

router.get("/platform", async (_req, res) => {
  return res.json({
    uptime: "99.99%",
    protection: "120Tbps",
    locations: 18,
    servers: 5000,
  });
});

router.get("/dashboard", async (req, res) => {
  const userId = getSessionUser(req);
  if (!userId) return res.status(401).json({ error: "Not authenticated" });

  const [serverCount] = await db.select({ count: count() }).from(serversTable)
    .where(eq(serversTable.userId, userId));

  const [runningCount] = await db.select({ count: count() }).from(serversTable)
    .where(sql`${serversTable.userId} = ${userId} AND ${serversTable.status} = 'running'`);

  const [openTickets] = await db.select({ count: count() }).from(ticketsTable)
    .where(sql`${ticketsTable.userId} = ${userId} AND ${ticketsTable.status} IN ('open', 'in_progress')`);

  return res.json({
    totalServers: serverCount.count,
    runningServers: runningCount.count,
    monthlySpend: 127.94,
    openTickets: openTickets.count,
    bandwidth: 2847.3,
    cpuAvg: 34.2,
    ramAvg: 51.7,
  });
});

router.get("/usage-history", async (req, res) => {
  const userId = getSessionUser(req);
  if (!userId) return res.status(401).json({ error: "Not authenticated" });

  const history = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    history.push({
      date: d.toISOString().split("T")[0],
      cpu: Math.round((25 + Math.sin(i * 0.3) * 15 + Math.random() * 10) * 10) / 10,
      ram: Math.round((45 + Math.sin(i * 0.2) * 12 + Math.random() * 8) * 10) / 10,
      bandwidth: Math.round((80 + Math.sin(i * 0.15) * 20 + Math.random() * 15) * 10) / 10,
      disk: Math.round((30 + i * 0.4 + Math.random() * 5) * 10) / 10,
    });
  }
  return res.json(history);
});

export default router;
