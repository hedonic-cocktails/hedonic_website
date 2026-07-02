interface Env {
    INVENTORY_PASSWORD?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const body = await context.request.json() as any;
    const pass = body?.password;
    const expected = context.env.INVENTORY_PASSWORD || "licitadmin";
    if (pass === expected) {
        return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
};
