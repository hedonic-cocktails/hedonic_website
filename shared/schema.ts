import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  ingredients: text("ingredients").notNull(),
  spirit: text("spirit").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  volume: text("volume").notNull(),
  servings: integer("servings").notNull(),
  abv: text("abv").notNull(),
  imageUrl: text("image_url").notNull(),
  color: text("color").notNull(),
  featured: boolean("featured").default(false),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  items: text("items").notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, status: true });

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
