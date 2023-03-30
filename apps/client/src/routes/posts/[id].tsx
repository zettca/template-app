import invariant from "tiny-invariant";
import {
  ActionFunction,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
  useRouteError,
  useSearchParams,
} from "react-router-dom";
import { HvButton } from "@hitachivantara/uikit-react-core";

import { PostForm } from "~/components/posts/PostForm";
import { PostView } from "~/components/posts/PostView";
import { trpc } from "~/utils/trpc";
import { Post } from "~/types/app";

import { formSchema } from "./new";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id: postId } = params;
  invariant(postId, "Post ID parameter not found");

  const post = await trpc.post.byId.query(postId);
  invariant(post, "Post not found");

  return post;
};

export const action: ActionFunction = async ({ params, request }) => {
  const { id } = params;
  invariant(id, "Invalid ID");
  const { author, title, body, tags, description } = formSchema.parse(
    await request.formData()
  );

  const postData = await trpc.post.edit.mutate({
    id,
    author,
    title,
    body,
    tags,
    description,
  });

  console.log(postData);

  return redirect(".");
};

export const Component: React.FC = () => {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isEditing = searchParams.get("edit") != null;

  console.log("data", data);

  return isEditing ? (
    <PostForm
      method="put"
      defaultValues={data as Post}
      onBack={() => navigate("")}
    />
  ) : (
    <div>
      {/* @ts-ignore */}
      <HvButton
        category="ghost"
        style={{ float: "right" }}
        onClick={() => setSearchParams("?edit")}
      >
        Edit post
      </HvButton>
      <PostView data={data} />
    </div>
  );
};

export const ErrorBoundary = () => {
  const { id } = useParams();
  const error = useRouteError() as Error;
  console.log(error, error.message);

  return (
    <div>
      <div>Could not load post `{id}`:</div>
      <div>{error.message}</div>
    </div>
  );
};
