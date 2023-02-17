import { Post as BackendPost } from "~/server/trpc/router";

export type Post = { id: number } & BackendPost;
