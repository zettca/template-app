import {
  ActionFunction,
  Link,
  redirect,
  useRouteError,
} from "react-router-dom";
import { zfd } from "zod-form-data";
import { HvTypography } from "@hitachivantara/uikit-react-core";

import { trpc } from "~/utils/trpc";
import { focusElement } from "~/utils";
import { PostForm } from "~/components/posts/PostForm";

const formSchema = zfd.formData({
  author: zfd.text().optional(),
  title: zfd.text(),
  body: zfd.text(),
  tags: zfd.text().optional(),
  description: zfd.text().optional(),
});

export const action: ActionFunction = async ({ request }) => {
  const { author, title, body, tags, description } = formSchema.parse(
    await request.formData()
  );

  console.log("Sending request to server...");

  const postData = await trpc.post.add.mutate({
    author,
    title,
    body,
    tags,
    description,
  });

  console.log("postData", postData);

  return redirect(`/posts/${postData.id}`);
};

export const Component: React.FC = () => {
  return <PostForm method="post" />;
};

export const ErrorBoundary: React.FC = () => {
  const { message } = useRouteError() as Error;

  return (
    <div>
      <HvTypography>Error creating post: {message}</HvTypography>
      <br />
      <HvTypography>
        <Link to="." ref={focusElement}>
          Click here
        </Link>
        to try again
      </HvTypography>
    </div>
  );
};
