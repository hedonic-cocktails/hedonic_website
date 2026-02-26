import { type Product, type InsertProduct, type Order, type InsertOrder, products, orders } from "@shared/schema";
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
}

export const storage = new DatabaseStorage();
