import { pgTable, serial, text, integer, numeric, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const invoiceStatusEnum = pgEnum("invoice_status", ["paid", "pending", "overdue", "cancelled"]);

export const invoicesTable = pgTable("invoices", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  invoiceNumber: text("invoice_number").notNull().unique(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  status: invoiceStatusEnum("status").notNull().default("pending"),
  period: text("period").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  dueDate: timestamp("due_date").notNull(),
});

export const insertInvoiceSchema = createInsertSchema(invoicesTable).omit({ id: true });
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoicesTable.$inferSelect;
