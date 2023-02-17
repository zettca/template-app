import {
  ActionFunction,
  Form,
  redirect,
  useRouteError,
} from "react-router-dom";
import { zfd } from "zod-form-data";
import {
  HvButton,
  HvGrid,
  HvInput,
  HvTextArea,
} from "@hitachivantara/uikit-react-core";

import { trpc } from "~/utils/trpc";

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

  const postData = await trpc.createPost.mutate({
    author,
    title,
    body,
    tags,
    description,
  });

  return redirect(`/posts/${postData.id}`);
};

export default function NewPost() {
  return (
    <Form method="post">
      <HvGrid container>
        <HvGrid item xs={12}>
          <HvInput required name="title" label="title" />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvInput required name="description" label="description" />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvTextArea required name="body" label="body" rows={4} />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvInput name="tags" label="tags" />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvButton type="submit">Create</HvButton>
        </HvGrid>
      </HvGrid>
    </Form>
  );
}

export const ErrorElement = () => {
  const { message } = useRouteError() as Error;

  return `Error creating post: ${message}`;
};
