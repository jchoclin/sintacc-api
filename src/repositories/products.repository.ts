import sql from "../databases/postgres"
import type { Product } from "../schemas/products.schemas"


/**
 * @description Get all products
 * @returns {Promise<Product[] | null>} All the products, or null if there aren't any
 */
export const getAllProducts = async () => {
    const results = await sql<Product[]>`
        SELECT * FROM sintacc
    `
    return [...results]
}

/**
 * @description Get products that match search query
 * @param {string} q - The search query
 * @returns {Promise<Product[] | null>} All the products that match search query, or null if there aren't any
 */

export const getSearchedProducts = async (q: string) => {
    const results = await sql<Product[]>`
        SELECT * FROM sintacc
        WHERE marca ILIKE ${'%' + q + '%'}
        OR denominacion_venta ILIKE ${'%' + q + '%'}
    `
    return [...results]
}

