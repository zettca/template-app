import {
  CreateTRPCClientOptions,
  createTRPCProxyClient,
  createTRPCReact,
  httpLink,
} from "@trpc/react-query";
import type { AppRouter } from "@server/src/routers";

const URL = import.meta.env.DEV ? "http://localhost:3002" : "";
export const clientConfig: CreateTRPCClientOptions<AppRouter> = {
  links: [httpLink({ url: `${URL}/trpc` })],
};

export const tRpc = createTRPCReact<AppRouter>();
export const trpc = createTRPCProxyClient<AppRouter>(clientConfig);
