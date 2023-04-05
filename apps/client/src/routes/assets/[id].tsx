import { useParams } from "react-router-dom";
import {
  HvEmptyState,
  HvLoading,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import { useGetAsset } from "@generated/apiComponents";

export const Component: React.FC = () => {
  const params = useParams();
  const assetId = params["id"]!;
  const { isLoading, error, data } = useGetAsset({ pathParams: { assetId } });

  console.log(isLoading, error, data);

  if (isLoading) {
    return <HvLoading />;
  }

  if (error || !data) {
    return <HvEmptyState message="Error" icon={undefined} />;
  }

  return (
    <HvTypography>
      Viewing asset <b>{data.name}</b>
    </HvTypography>
  );
};
