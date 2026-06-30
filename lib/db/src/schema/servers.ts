import { pgTable, serial, text, integer, numeric, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const serverTypeEnum = pgEnum("server_type", ["vps", "dedicated", "gpu", "cloud", "storage", "kubernetes"]);
export const serverStatusEnum = pgEnum("server_status", ["running", "stopped", "provisioning", "suspended"]);

export const serversTable = pgTable("servers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  name: text("name").notNull(),
  type: serverTypeEnum("type").notNull(),
  status: serverStatusEnum("status").notNull().default("provisioning"),
  ip: text("ip").notNull(),
  location: text("location").notNull(),
  cpu: integer("cpu").notNull(),
  ram: integer("ram").notNull(),
  disk: integer("disk").notNull(),
  bandwidth: integer("bandwidth").notNull(),
  monthlyCost: numeric("monthly_cost", { precision: 10, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertServerSchema = createInsertSchema(serversTable).omit({ id: true, createdAt: true });
export type InsertServer = z.infer<typeof insertServerSchema>;
export type Server = typeof serversTable.$inferSelect;
