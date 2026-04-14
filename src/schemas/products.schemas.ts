import { t, type Static } from "elysia";

const tags = ["Products"]; // Category tags for API documentation

/*
  Products route schema (GET /products/search)
*/

// Response schema for 200 OK
export const productsSuccessResponseSchema = t.Array(t.Object({
  id: t.Number(),
  rnpa: t.String(),
  marca: t.String(),
  nombre_fantasia: t.String(),
  denominacion_venta: t.String(),
  tipo_producto: t.String(),
  estado: t.String() 
}));

// Schema itself for the products search route
export const productSearchRouteSchema = {
  response: {
    200: productsSuccessResponseSchema,
  },
  query: t.Object({
    q: t.String({ description: "Search word", minLength: 2 })
    }),
  detail: {
    tags,
    summary: "Products search",
    description: "Returns all the queried products from the db",
  },
};

// Type for successful products search response
export type ProductsSearchResponse = Static<typeof productsSuccessResponseSchema>


