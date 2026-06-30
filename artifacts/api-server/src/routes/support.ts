import { Router } from "express";
import { db, ticketsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateTicketBody } from "@workspace/api-zod";

const router = Router();

function getSessionUser(req: any): number | null {
  return req.session?.userId ?? null;
}

router.get("/tickets", async (req, res) => {
  const userId = getSessionUser(req);
  if (!userId) return res.status(401).json({ error: "Not authenticated" });

  const tickets = await db.select().from(ticketsTable)
    .where(eq(ticketsTable.userId, userId))
    .orderBy(ticketsTable.createdAt);

  return res.json(tickets);
});

router.post("/tickets", async (req, res) => {
  const userId = getSessionUser(req);
  if (!userId) return res.status(401).json({ error: "Not authenticated" });

  const parsed = CreateTicketBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  const [ticket] = await db.insert(ticketsTable).values({
    userId,
    subject: parsed.data.subject,
    description: parsed.data.description,
    priority: (parsed.data.priority as any) || "medium",
    status: "open",
  }).returning();

  return res.status(201).json(ticket);
});

export default router;
