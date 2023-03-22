import { Link, LoaderFunction, Outlet, useLoaderData } from "react-router-dom";
import {
  HvButton,
  HvContainer,
  HvGrid,
  HvListContainer,
  HvListItem,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import { trpc } from "~/utils/trpc";

export const loader = async () => {
  return trpc.getPosts.query();
};

export default function PostsLayout() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <HvContainer maxWidth="xl">
      <HvGrid container>
        <HvGrid item xs={12} sm={4}>
          <HvListContainer interactive condensed>
            {data.map((post) => (
              <HvListItem key={post.id}>
                {/* @ts-ignore */}
                <HvTypography component={Link} variant="link" to={`${post.id}`}>
                  {post.title}
                </HvTypography>
              </HvListItem>
            ))}
          </HvListContainer>
          {/* @ts-ignore */}
          <HvButton component={Link} to="new">
            New post
          </HvButton>
        </HvGrid>
        <HvGrid item xs={12} sm={8}>
          <Outlet />
        </HvGrid>
      </HvGrid>
    </HvContainer>
  );
}

export const ErrorElement = () => {
  return "Error loading posts 🤔";
};
