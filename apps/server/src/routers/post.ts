import { z } from "zod";
import { t } from "../trpc";

const nanoid = (num: number) => `${Math.floor(Math.random() * 10 ** num)}`;

const postSchema = z.object({
  title: z.string(),
  author: z.string().optional().default("Doe"),
  description: z.string().optional(),
  body: z.string().min(20),
  tags: z.string().optional(),
});

export type Post = { id: string } & z.infer<typeof postSchema>;

const POSTS = new Map<string, Post>();

const addPost = (id = nanoid(8)) => {
  const newPost = {
    author: "zettca",
    title: `Backend post ${id}`,
    tags: "t1,t2",
    body: `Post description lorem ipsum for ${id}`,
  };
  POSTS.set(id, { id, ...newPost });
};

// seed
addPost("base");
addPost();
addPost();
addPost();
addPost();

export const postRouter = t.router({
  byId: t.procedure
    .input((id) => {
      return id;
    })
    .query(({ input }) => {
      const id = String(input);
      const post = POSTS.get(id || "base");
      return post;
    }),
  list: t.procedure
    .input(z.object({ author: z.string().optional() }).optional())
    .query(({ input }) => {
      const author = input?.author;
      const posts = [...POSTS.values()];
      return posts.filter((p) => !author || p.author === author);
    }),
  add: t.procedure.input(postSchema).mutation(({ input }) => {
    const newPostId = nanoid(8);
    const newPost: Post = { id: newPostId, ...input };
    POSTS.set(newPostId, newPost);
    return newPost;
  }),
});
