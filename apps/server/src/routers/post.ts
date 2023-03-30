import { randomUUID } from "node:crypto";
import invariant from "tiny-invariant";
import { z } from "zod";
import { t } from "../trpc";

const nanoid = (t = 8) => randomUUID().slice(0, t);

const createPostSchema = z.object({
  title: z.string(),
  author: z.string().optional().default("Doe"),
  description: z.string().optional(),
  body: z.string().min(20),
  tags: z.string().optional(),
});

const editPostSchema = z.object({ id: z.string(), ...createPostSchema.shape });

export type Post = { id: string } & z.infer<typeof createPostSchema>;

const POSTS = new Map<string, Post>();

export const addPost = (id = nanoid(8)) => {
  const newPost = {
    author: "zettca",
    title: `Post ${id}`,
    tags: "t1,t2",
    body: `Post description lorem ipsum for ${id}`,
  };
  POSTS.set(id, { id, ...newPost });
};

export const postRouter = t.router({
  byId: t.procedure
    .input((id) => {
      return id;
    })
    .query(({ input }) => {
      const id = String(input);
      const post = POSTS.get(id);
      return post;
    }),
  list: t.procedure
    .input(z.object({ author: z.string().optional() }).optional())
    .query(({ input }) => {
      const author = input?.author;
      const posts = [...POSTS.values()];
      return posts.filter((p) => !author || p.author === author);
    }),
  add: t.procedure.input(createPostSchema).mutation(({ input }) => {
    const newPostId = nanoid(8);
    const newPost: Post = { id: newPostId, ...input };
    POSTS.set(newPostId, newPost);
    return newPost;
  }),
  edit: t.procedure.input(editPostSchema).mutation(({ input }) => {
    const { id } = input;
    const p = POSTS.get(id);
    invariant(id, "Post doesn't exist");
    POSTS.set(id, { ...p, ...input });
  }),
});
