import type { Application } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { createContext } from "./trpc";
import { appRouter as router } from "./routers";

export function setupMiddlewares(app: Application) {
  app.use(cors());
  app.use(cookieParser());

  app.use(
    "/trpc",
    createExpressMiddleware({
      router,
      createContext,
      batching: { enabled: false },
    })
  );
}
