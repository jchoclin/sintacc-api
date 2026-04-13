import { Elysia } from "elysia";
import sql from "../utils/db";
import { productSearchRouteSchema } from "../schemas/products.schemas";


export const productsRoutes = new Elysia().get("/products/search", async ({ query }) => {
    const { q } = query;
    const results = await sql<{
        id: number;
        rnpa: string;
        marca: string;
        nombre_fantasia: string;
        denominacion_venta: string;
        tipo_producto: string;
        estado: string;
    }[]>`
        SELECT * FROM sintacc
        WHERE marca ILIKE ${'%' + q + '%'}
        OR denominacion_venta ILIKE ${'%' + q + '%'}
        LIMIT 50
    `
    return [...results]
}, productSearchRouteSchema);