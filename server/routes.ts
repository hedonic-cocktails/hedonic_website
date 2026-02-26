import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";

const STATE_TAX_RATES: Record<string, number> = {
  AL: 0.04, AK: 0, AZ: 0.056, AR: 0.065, CA: 0.0725,
  CO: 0.029, CT: 0.0635, DE: 0, DC: 0.06, FL: 0.06,
  GA: 0.04, HI: 0.04, ID: 0.06, IL: 0.0625, IN: 0.07,
  IA: 0.06, KS: 0.065, KY: 0.06, LA: 0.0445, ME: 0.055,
  MD: 0.06, MA: 0.0625, MI: 0.06, MN: 0.06875, MS: 0.07,
  MO: 0.04225, MT: 0, NE: 0.055, NV: 0.0685, NH: 0,
  NJ: 0.06625, NM: 0.05125, NY: 0.04, NC: 0.0475, ND: 0.05,
  OH: 0.0575, OK: 0.045, OR: 0, PA: 0.06, RI: 0.07,
  SC: 0.06, SD: 0.042, TN: 0.07, TX: 0.0625, UT: 0.061,
  VT: 0.06, VA: 0.053, WA: 0.065, WV: 0.06, WI: 0.05, WY: 0.04,
};

function getTaxRate(stateInput: string): number {
  const normalized = stateInput.trim().toUpperCase();
  return STATE_TAX_RATES[normalized] ?? 0;
}

import { rateLimit } from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: { message: "Too many requests, please try again later." }
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use("/api", apiLimiter);

  app.get("/api/products", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 50;
    const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : 0;
    const products = await storage.getProducts(limit, offset);
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

    try {
      const parsedItems = JSON.parse(result.data.items);
      let calculatedTotal = 0;
      for (const item of parsedItems) {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(400).json({ message: `Product not found: ${item.productId}` });
        }
        calculatedTotal += Number(product.price) * item.quantity;
      }

      const match = result.data.shippingAddress.match(/([A-Z]{2})\s+\d{5}(-\d{4})?$/);
      const state = match ? match[1] : "";
      const taxRate = getTaxRate(state);
      const taxAmount = calculatedTotal * taxRate;
      const finalTotal = calculatedTotal + taxAmount;

      const orderData = {
        ...result.data,
        total: Number(finalTotal.toFixed(2))
      };

      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (e) {
      return res.status(400).json({ message: "Invalid items format" });
    }
  });

  return httpServer;
}
