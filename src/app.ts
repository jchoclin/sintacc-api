import { Elysia } from "elysia";
import { cors } from "./cors";
import { swagger } from "./swagger";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./errorHandler";
import { healthRoutes } from "./routes/health.routes";
import "./databases/postgres";
import { productsRoutes } from "./routes/products.routes";
import { rateLimit } from "elysia-rate-limit"

export const app = new Elysia()
  .use(cors)
  .use(swagger)
  .use(logger)
  .use(errorHandler)
  .use(healthRoutes)
  .use(productsRoutes)
  .use(rateLimit({
    duration: 60000, 
    max: 100         
}));

export type App = typeof app;
