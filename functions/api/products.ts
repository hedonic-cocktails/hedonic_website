import { drizzle } from 'drizzle-orm/d1';
import { products } from '../../shared/schema';

interface Env {
    DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const db = drizzle(context.env.DB);
    const result = await db.select().from(products);
    return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
};
