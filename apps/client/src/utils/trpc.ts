import {
  CreateTRPCClientOptions,
  createTRPCProxyClient,
  createTRPCReact,
  httpLink,
} from "@trpc/react-query";
import type { AppRouter } from "@server/src/routers";

export const clientConfig: CreateTRPCClientOptions<AppRouter> = {
  links: [httpLink({ url: "http://localhost:3002/trpc" })],
};

export const tRpc = createTRPCReact<AppRouter>();
export const trpc = createTRPCProxyClient<AppRouter>(clientConfig);
