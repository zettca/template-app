import { inferAsyncReturnType, initTRPC } from "npm:@trpc/server";
import { CreateExpressContextOptions } from "npm:@trpc/server/adapters/express";

export const createContext = ({ req, res }: CreateExpressContextOptions) => ({
  req,
  res,
});

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();
