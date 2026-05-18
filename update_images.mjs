import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./shared/schema.js";
import path from "path";
import { sql } from "drizzle-orm";

const client = createClient({
    url: `file:${path.join(process.cwd(), "sqlite.db")}`,
});

export const db = drizzle(client, { schema });

async function run() {
    const allProducts = await db.select().from(schema.products);
    for (const p of allProducts) {
        if (!p.imageUrls || p.imageUrls.length === 0) {
            await db.update(schema.products)
                .set({ imageUrls: [p.imageUrl, p.imageUrl] })
                .where(sql`id = ${p.id}`);
            console.log(`Updated images for ${p.name}`);
        }
    }
    console.log("Done");
}

run().catch(console.error);
