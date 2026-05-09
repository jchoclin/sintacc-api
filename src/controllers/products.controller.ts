import type { Context } from "elysia";
import type {
 GetSearchedProductsRouteContract,
 GetAllProductsRouteContract
} from "../schemas/products.schemas";
import * as productsService from "../services/products.service";

/**
 * @description Get all products
 * @param {Context} set - The context for setting the response status
 * @returns {Promise<GetSearchedProductsRouteContract["response"][200 | 404]>} get all products if none, returns null
 */
export const getAllProducts = async ({
  set,
}: Context<GetAllProductsRouteContract>): Promise<
  GetAllProductsRouteContract["response"][200 | 404]
> => {
  try {
    const products = await productsService.getAllProducts();
    return products;
  } catch (error) {
    if (error instanceof productsService.NotFoundError) {
      set.status = 404;
    } else {
      throw error;
    }

    return null;
  }
};

/**
 * @description Get products that match searched word
 * @param {Context} query - The search query context
 * @param {Context} set - The context for setting the response status
 * @returns {Promise<GetSearchedProductsRouteContract["response"][200 | 404]>} get products that match if none, returns null
 */
export const getSearchedProducts = async ({ query,
  set,
}: Context<GetSearchedProductsRouteContract>): Promise<
  GetSearchedProductsRouteContract["response"][200 | 404]
> => {
  try {
    const products = await productsService.getSearchedProducts(query.q);
    return products;
  } catch (error) {
    if (error instanceof productsService.NotFoundError) {
      set.status = 404;
    } else {
      throw error;
    }

    return null;
  }
};

