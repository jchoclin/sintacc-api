import { t, type Static } from "elysia";

const tags = ["Products"]; 

/**
 * @description Schema for a product
 */

export const productSchema = t.Object({
  id: t.Number(),
  rnpa: t.String(),
  marca: t.String(),
  nombre_fantasia: t.String(),
  denominacion_venta: t.String(),
  tipo_producto: t.String(),
  estado: t.String() 
});

/**
 * @description Schema for search query
 */

export const searchQuerySchema = t.Object({
    q: t.String({ description: "Search word", minLength: 2 })
    });

/**
 * @description Type for search query
 */ 
export type SearchQuery = Static<typeof searchQuerySchema>;


/**
 * @description Type for products
 */
export type Product = Static<typeof productSchema>;

/**
 * @description Schema for not found response
 */
const notFoundResponseSchema = t.Null({ description: "Not found" });

/**
 * @description Type for not found response
 */
export type NotFoundResponse = Static<typeof notFoundResponseSchema>;

/**
 * @description Response schema for 200 OK
 */ 
export const productsSuccessResponseSchema = t.Array(productSchema);

/**
 * @description Schema for GET /products/search route
 */

export const productSearchRouteSchema = {
  query: searchQuerySchema,
  response: {
    200: productsSuccessResponseSchema,
    404: notFoundResponseSchema
  },
  detail: {
    tags,
    summary: "Products search",
    description: "Returns all the queried products found in the database",
  },
};

/**
 * @description Type for successful products search response
 */

export type ProductsSearchResponse = Static<typeof productsSuccessResponseSchema>

/**
 * @description Interface representing the contract of the get products with search query
 */
export interface GetSearchedProductsRouteContract {
  query: SearchQuery,
  response: {
    200: ProductsSearchResponse;
    404: NotFoundResponse;
  };
}

/**
 * @description Schema for GET /products route
 */

export const allProductRouteSchema = {
  response: {
    200: productsSuccessResponseSchema,
    404: notFoundResponseSchema
  },
  detail: {
    tags,
    summary: "All Products",
    description: "Returns all the products found in the database",
  },
};

/**
 * @description Type for successful products response
 */

export type AllProductsResponse = Static<typeof productsSuccessResponseSchema>

/**
 * @description Interface representing the contract of the get all products 
 */
export interface GetAllProductsRouteContract {
  response: {
    200: AllProductsResponse;
    404: NotFoundResponse;
  };
}


