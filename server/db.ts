import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "@shared/schema";
import path from "path";

const client = createClient({
    url: `file:${path.join(process.cwd(), "sqlite.db")}`,
});
export const db = drizzle(client, { schema });
