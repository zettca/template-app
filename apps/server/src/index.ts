import http from "node:http";
import express from "express";

import { setupMiddlewares } from "./middlewares";

export function setupServer() {
  const app = express();
  const server = http.createServer(app);

  setupMiddlewares(app);

  return server;
}

const server = setupServer();
const port = Number(process.env.PORT) || 3001;
server.listen(port, () => {
  console.log(`🚀 Listening on http://localhost:${port}`);
});
