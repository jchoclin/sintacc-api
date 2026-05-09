import { Elysia } from "elysia";
import * as productsController from "../controllers/products.controller"
import { allProductRouteSchema, productSearchRouteSchema } from "../schemas/products.schemas";

export const productsRoutes = new Elysia()
    .get("/products", productsController.getAllProducts, allProductRouteSchema)
    .get("/products/search", productsController.getSearchedProducts, productSearchRouteSchema);
    