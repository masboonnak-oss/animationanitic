import { Router } from "express";
import { db, serversTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateServerBody } from "@workspace/api-zod";

const router = Router();

function getSessionUser(req: any): number | null {
  return req.session?.userId ?? null;
}

function randomIp(): string {
  return `${Math.floor(Math.random() * 200) + 50}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

router.get("/", async (req, res) => {
  const userId = getSessionUser(req);
  if (!userId) return res.status(401).json({ error: "Not authenticated" });

  const servers = await db.select().from(serversTable).where(eq(serversTable.userId, userId));
  return res.json(servers.map(s => ({
    ...s,
    monthlyCost: Number(s.monthlyCost),
    createdAt: s.createdAt,
  })));
});

router.post("/", async (req, res) => {
  const userId = getSessionUser(req);
  if (!userId) return res.status(401).json({ error: "Not authenticated" });

  const parsed = CreateServerBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  const costs: Record<string, number> = {
    vps: 12.99, dedicated: 89.99, gpu: 149.99, cloud: 24.99, storage: 9.99, kubernetes: 59.99
  };

  const [server] = await db.insert(serversTable).values({
    userId,
    name: parsed.data.name,
    type: parsed.data.type as any,
    status: "provisioning",
    ip: randomIp(),
    location: parsed.data.location,
    cpu: parsed.data.cpu,
    ram: parsed.data.ram,
    disk: parsed.data.disk,
    bandwidth: 1000,
    monthlyCost: String(costs[parsed.data.type] ?? 19.99),
  }).returning();

  return res.status(201).json({ ...server, monthlyCost: Number(server.monthlyCost) });
});

router.get("/:id", async (req, res) => {
  const userId = getSessionUser(req);
  if (!userId) return res.status(401).json({ error: "Not authenticated" });

  const id = parseInt(req.params.id);
  const [server] = await db.select().from(serversTable)
    .where(eq(serversTable.id, id)).limit(1);

  if (!server || server.userId !== userId) return res.status(404).json({ error: "Not found" });
  return res.json({ ...server, monthlyCost: Number(server.monthlyCost) });
});

router.get("/:id/usage", async (req, res) => {
  const userId = getSessionUser(req);
  if (!userId) return res.status(401).json({ error: "Not authenticated" });

  const id = parseInt(req.params.id);
  return res.json({
    serverId: id,
    cpu: Math.random() * 60 + 20,
    ram: Math.random() * 50 + 30,
    bandwidth: Math.random() * 40 + 10,
    disk: Math.random() * 30 + 20,
    timestamp: new Date().toISOString(),
  });
});

export default router;
