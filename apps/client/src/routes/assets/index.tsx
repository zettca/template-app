import { Link } from "react-router-dom";
import { HvEmptyState, HvLoading } from "@hitachivantara/uikit-react-core";

import { useListAssets } from "@generated/apiComponents";

export const Component: React.FC = () => {
  const queryParams = { skip: 0, take: 20 };
  const { isLoading, error, data } = useListAssets({ queryParams });

  console.log({ isLoading, error, data });

  if (isLoading) {
    return <HvLoading />;
  }

  if (error || !data) {
    return <HvEmptyState message="Error" icon={undefined} />;
  }

  return (
    <div>
      {data.map((el) => (
        <p key={el.id}>
          <Link to={el.id}>{el.name}</Link>
        </p>
      ))}
    </div>
  );
};
