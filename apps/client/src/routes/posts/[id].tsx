import {
  LoaderFunctionArgs,
  useLoaderData,
  useRouteError,
} from "react-router-dom";
import { HvTag, HvTypography } from "@hitachivantara/uikit-react-core";

import { trpc } from "~/utils/trpc";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const postId = params["id"];

  invariant(postId, "Post ID not found");

  return trpc.post.byId.query(postId);
};

export const Component: React.FC = () => {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div>
      <HvTypography variant="3xlTitle">{data.title}</HvTypography>
      <HvTypography component="span">
        Created by <code>{data.author}</code>
      </HvTypography>{" "}
      <span>
        {data.tags?.split(",").map((tag) => (
          <HvTag
            key={tag}
            type="categorical"
            label={<HvTypography>{tag}</HvTypography>}
          />
        ))}
      </span>
      <HvTypography>{data.description}</HvTypography>
      <HvTypography>{data.body}</HvTypography>
    </div>
  );
};

export const ErrorBoundary = () => {
  const { message } = useRouteError() as Error;
  console.error(message);

  return <div>Error: {message}</div>;
};
