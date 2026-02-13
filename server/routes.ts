import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/:slug", async (req, res) => {
    const product = await storage.getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  app.post("/api/orders", async (req, res) => {
    const result = insertOrderSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid order data", errors: result.error.flatten() });
    }
    const order = await storage.createOrder(result.data);
    res.status(201).json(order);
  });

  return httpServer;
}
