import { RequestHandler } from "msw";
import { assetsDb } from "./models";
import seed from "./seed";

seed({ numAssets: 200 });

export const handlers: RequestHandler[] = [
  ...assetsDb.asset.toHandlers("rest", "http://localhost:8062/api"),
];
