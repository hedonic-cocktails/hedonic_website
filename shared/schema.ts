import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = sqliteTable("products", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  ingredients: text("ingredients").notNull(),
  spirit: text("spirit").notNull(),
  price: real("price").notNull(),
  volume: text("volume").notNull(),
  servings: integer("servings").notNull(),
  abv: text("abv").notNull(),
  imageUrl: text("image_url").notNull(),
  imageUrls: text("image_urls", { mode: "json" }).$type<string[]>().notNull().default(sql`'[]'`),
  color: text("color").notNull(),
  featured: integer("featured", { mode: "boolean" }).default(false),
});

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  items: text("items").notNull(),
  total: real("total").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
});

export const batches = sqliteTable("batches", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  productId: text("product_id").notNull(),
  bottles750ml: integer("bottles_750ml").notNull().default(0),
  bottles187ml: integer("bottles_187ml").notNull().default(0),
  status: text("status").notNull().default("active"),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, status: true });
export const insertBatchSchema = createInsertSchema(batches).omit({ id: true, createdAt: true });

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertBatch = z.infer<typeof insertBatchSchema>;
export type Batch = typeof batches.$inferSelect;

