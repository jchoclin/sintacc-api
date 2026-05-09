import type { Product } from "../schemas/products.schemas";
import * as productsRepository from "../repositories/products.repository";

/*
  Errors definitions
*/

/**
 * @description Error thrown when there isn't any products
 */
export class NotFoundError extends Error {
  constructor(message = "Products not found") {
    super(message);
    this.name = "NotFoundError";
  }
}


/*
  Service methods
*/

/**
 * @description Get all products 
 * @returns {Promise<Products>} all products 
 * @throws {NotFoundError} If there aren't any
 */
export const getAllProducts = async (): Promise<Product[]> => {
  const products = await productsRepository.getAllProducts();
  if (products.length !== 0) {
    return products;
  } else {
    throw new NotFoundError();
  }
};


/**
 * @description Get all products that match search query
 * @param {string} q - the search query
 * @returns {Promise<Products>} Products that match query
 * @throws {NotFoundError} If there aren't any matches
 */
export const getSearchedProducts = async (q: string): Promise<Product[]> => {
  const products = await productsRepository.getSearchedProducts(q);
  if (products.length !== 0) {
    return products;
  } else {
    throw new NotFoundError();
  }
};





