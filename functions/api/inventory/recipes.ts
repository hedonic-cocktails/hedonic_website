import { drizzle } from 'drizzle-orm/d1';
import { products } from '../../../shared/schema';

interface Env {
    DB: D1Database;
    INVENTORY_PASSWORD?: string;
}

function checkAuth(request: Request, env: Env) {
    const pass = request.headers.get("x-admin-password");
    const expected = env.INVENTORY_PASSWORD || "licitadmin";
    return pass === expected;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    if (!checkAuth(context.request, context.env)) return new Response("Unauthorized", { status: 401 });

    const body = await context.request.json() as any;
    const name = body?.name;
    if (!name) return new Response(JSON.stringify({ message: "Name required" }), { status: 400, headers: { "Content-Type": "application/json" } });

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

    const db = drizzle(context.env.DB);
    const result = await db.insert(products).values(newProduct).returning();
    return new Response(JSON.stringify(result[0]), { headers: { "Content-Type": "application/json" } });
};
