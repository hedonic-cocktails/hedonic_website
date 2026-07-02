import { drizzle } from 'drizzle-orm/d1';
import { batches, products, insertBatchSchema } from '../../../shared/schema';

interface Env {
    DB: D1Database;
    INVENTORY_PASSWORD?: string;
}

function checkAuth(request: Request, env: Env) {
    const pass = request.headers.get("x-admin-password");
    const expected = env.INVENTORY_PASSWORD || "licitadmin";
    return pass === expected;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    if (!checkAuth(context.request, context.env)) {
        return new Response("Unauthorized", { status: 401 });
    }
    const db = drizzle(context.env.DB);
    const allBatches = await db.select().from(batches);
    const allProducts = await db.select().from(products);

    const result = allBatches.map((b: any) => {
        const p = allProducts.find((prod: any) => prod.id === b.productId);
        return { ...b, productName: p ? p.name : "Unknown Recipe" };
    });

    return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
    if (!checkAuth(context.request, context.env)) {
        return new Response("Unauthorized", { status: 401 });
    }
    const data = await context.request.json() as any;
    const parsed = insertBatchSchema.safeParse(data);
    if (!parsed.success) {
        return new Response(JSON.stringify({ message: "Invalid data", errors: parsed.error.flatten() }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    const db = drizzle(context.env.DB);
    const result = await db.insert(batches).values(parsed.data).returning();
    return new Response(JSON.stringify(result[0]), { status: 201, headers: { "Content-Type": "application/json" } });
};
