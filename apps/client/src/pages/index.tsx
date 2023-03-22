import { useState } from "react";
import { Link, useLoaderData, useRouteError } from "react-router-dom";
import { HvButton, HvTypography } from "@hitachivantara/uikit-react-core";

import { trpc } from "~/utils/trpc";

export const loader = async () => {
  const [{ message, time }, { message: greeting }] = await Promise.all([
    trpc.ping.query(),
    trpc.hello.query({ name: "Bruno", age: 42 }),
  ]);

  return { message, time, greeting };
};

export default function Index() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      <HvTypography variant="xlTitle">Vite + UI-Kit React ✨</HvTypography>
      <Link to="posts">
        <HvTypography variant="link">Go to POSTS</HvTypography>
      </Link>
      <HvButton variant="outlined" onClick={() => setCount((c) => c + 1)}>
        count is {count}
      </HvButton>
      <HvTypography>
        Server says <code>"{data.message}"</code> at{" "}
        <code>{new Date(data.time).toISOString()}</code>
      </HvTypography>
      <HvTypography>{data.greeting}</HvTypography>
    </div>
  );
}

export const ErrorElement = () => {
  const { message } = useRouteError() as Error;

  return <HvTypography>💥 Oops. Something went wrong: {message} </HvTypography>;
};
