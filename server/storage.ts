import { type Product, type InsertProduct, type Order, type InsertOrder, type Batch, type InsertBatch, products, orders, batches } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProducts(limit?: number, offset?: number): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  getOrders(limit?: number, offset?: number): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  getBatches(): Promise<any[]>;
  createBatch(batch: InsertBatch): Promise<Batch>;
  updateBatch(id: string, updates: Partial<InsertBatch>): Promise<Batch | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(limit: number = 50, offset: number = 0): Promise<Product[]> {
    return db.select().from(products).limit(limit).offset(offset);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [created] = await db.insert(products).values(product).returning();
    return created;
  }

  async getOrders(limit: number = 50, offset: number = 0): Promise<Order[]> {
    return db.select().from(orders).limit(limit).offset(offset);
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [created] = await db.insert(orders).values(order).returning();
    return created;
  }

  async getBatches(): Promise<any[]> {
    const allBatches = await db.select().from(batches);
    const allProducts = await db.select().from(products);

    return allBatches.map(b => {
      const p = allProducts.find(prod => prod.id === b.productId);
      return {
        ...b,
        productName: p ? p.name : "Unknown Recipe"
      };
    });
  }

  async createBatch(batch: InsertBatch): Promise<Batch> {
    const [created] = await db.insert(batches).values(batch).returning();
    return created;
  }

  async updateBatch(id: string, updates: Partial<InsertBatch>): Promise<Batch | undefined> {
    const [updated] = await db.update(batches).set(updates).where(eq(batches.id, id)).returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
