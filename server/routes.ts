import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertBatchSchema } from "@shared/schema";

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

  const INVENTORY_PASSWORD = process.env.INVENTORY_PASSWORD || "licitadmin";

  const requireInventoryAuth = (req: any, res: any, next: any) => {
    const password = req.headers['x-admin-password'];
    if (password === INVENTORY_PASSWORD) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };

  app.post("/api/inventory/verify", (req, res) => {
    const { password } = req.body;
    if (password === INVENTORY_PASSWORD) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  });

  app.get("/api/inventory", requireInventoryAuth, async (req, res) => {
    const batches = await storage.getBatches();
    res.json(batches);
  });

  app.post("/api/inventory", requireInventoryAuth, async (req, res) => {
    const result = insertBatchSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid batch data", errors: result.error.flatten() });
    }
    const batch = await storage.createBatch(result.data);
    res.status(201).json(batch);
  });

  app.post("/api/inventory/recipes", requireInventoryAuth, async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newProduct = {
      name,
      slug,
      tagline: "TBD",
      description: "Recipe in development",
      ingredients: "TBD",
      spirit: "TBD",
      price: 0,
      volume: "750ml",
      servings: 1,
      abv: "0%",
      imageUrl: "/images/placeholder.png",
      color: "from-gray-500/20 to-gray-900/20"
    };
    const product = await storage.createProduct(newProduct);
    res.json(product);
  });

  app.patch("/api/inventory/:id", requireInventoryAuth, async (req, res) => {
    const batch = await storage.updateBatch(req.params.id, req.body);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.json(batch);
  });

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
