// import { nanoid } from "nanoid";
import { z } from "zod";
import { t } from "../trpc";
import { postRouter } from "./post";

export const appRouter = t.router({
  ping: t.procedure.query(() => {
    return { message: "pong", time: Date.now() };
  }),
  hello: t.procedure
    .input(
      z.object({
        name: z.string(),
        age: z.number().optional(),
      })
    )
    .query(({ input }) => {
      return { message: `Hello ${input.name} ${input.age}!` };
    }),
  post: postRouter,
});

export type AppRouter = typeof appRouter;
