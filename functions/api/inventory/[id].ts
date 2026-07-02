import { drizzle } from 'drizzle-orm/d1';
import { batches } from '../../../shared/schema';
import { eq } from 'drizzle-orm';

interface Env {
    DB: D1Database;
    INVENTORY_PASSWORD?: string;
}

function checkAuth(request: Request, env: Env) {
    const pass = request.headers.get("x-admin-password");
    const expected = env.INVENTORY_PASSWORD || "licitadmin";
    return pass === expected;
}

export const onRequestPatch: PagesFunction<Env> = async (context) => {
    if (!checkAuth(context.request, context.env)) return new Response("Unauthorized", { status: 401 });

    const id = context.params.id as string;
    const updates = await context.request.json() as any;

    const db = drizzle(context.env.DB);
    const result = await db.update(batches).set(updates).where(eq(batches.id, id)).returning();

    if (result.length === 0) return new Response("Not found", { status: 404 });
    return new Response(JSON.stringify(result[0]), { headers: { "Content-Type": "application/json" } });
};
