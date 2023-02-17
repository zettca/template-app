import http from "node:http";
import express from "npm:express";
import { createExpressMiddleware } from "npm:@trpc/server/adapters/express";
import cookieParser from "npm:cookie-parser";
import cors from "npm:cors";

import { createContext } from "./trpc.ts";
import { appRouter as router } from "./api/index.ts";

const app = express();

const server = http.createServer(app);

// setupMiddlewares(app);
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

const PORT = Number(Deno.env.get("PORT")) || 3001;
server.listen(PORT, () =>
  console.log(`🚀 Listening on http://localhost:${PORT}`)
);
