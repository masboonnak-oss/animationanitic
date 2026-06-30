import { Router } from "express";
import { db, invoicesTable, serversTable } from "@workspace/db";
import { eq, count, sum } from "drizzle-orm";

const router = Router();

function getSessionUser(req: any): number | null {
  return req.session?.userId ?? null;
}

router.get("/invoices", async (req, res) => {
  const userId = getSessionUser(req);
  if (!userId) return res.status(401).json({ error: "Not authenticated" });

  const invoices = await db.select().from(invoicesTable)
    .where(eq(invoicesTable.userId, userId))
    .orderBy(invoicesTable.createdAt);

  return res.json(invoices.map(i => ({
    ...i,
    amount: Number(i.amount),
  })));
});

router.get("/summary", async (req, res) => {
  const userId = getSessionUser(req);
  if (!userId) return res.status(401).json({ error: "Not authenticated" });

  const [serverCount] = await db.select({ count: count() }).from(serversTable)
    .where(eq(serversTable.userId, userId));

  const nextInvoiceDate = new Date();
  nextInvoiceDate.setDate(nextInvoiceDate.getDate() + 15);

  return res.json({
    currentMonthTotal: 127.94,
    nextInvoiceDate: nextInvoiceDate.toISOString(),
    activeServers: serverCount.count,
    paymentMethod: "Visa ending in 4242",
    creditBalance: 0,
  });
});

export default router;
