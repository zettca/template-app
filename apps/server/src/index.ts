import http from "node:http";
import express from "express";

import { setupMiddlewares } from "./middlewares";
import { addPost } from "./routers/post";

export function setupServer() {
  const app = express();
  const server = http.createServer(app);

  setupMiddlewares(app);

  return server;
}

const server = setupServer();
const port = Number(process.env.PORT) || 3002;
server.listen(port, () => {
  console.log(`🚀 Listening on http://localhost:${port}`);
});

// seed
addPost();
addPost();
addPost();
addPost();
addPost();
