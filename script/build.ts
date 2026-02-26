import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("generating static API endpoints for Cloudflare Pages...");
  const { storage } = await import("../server/storage.js");
  const fs = await import("fs/promises");
  const path = await import("path");

  const apiDir = path.join(process.cwd(), "dist", "public", "api");
  const productsDir = path.join(apiDir, "products");
  await fs.mkdir(productsDir, { recursive: true });

  const products = await storage.getProducts(100, 0);
  await fs.writeFile(path.join(apiDir, "products.json"), JSON.stringify(products));

  for (const product of products) {
    await fs.writeFile(path.join(productsDir, `${product.slug}.json`), JSON.stringify(product));
  }

  const headersObj = `/api/*\n  Access-Control-Allow-Origin: *\n  Content-Type: application/json\n`;
  await fs.writeFile(path.join(process.cwd(), "dist", "public", "_headers"), headersObj);

  const redirectsObj = `/api/products /api/products.json 200\n/api/products/* /api/products/:splat.json 200\n/* /index.html 200\n`;
  await fs.writeFile(path.join(process.cwd(), "dist", "public", "_redirects"), redirectsObj);


  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
