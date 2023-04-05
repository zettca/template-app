import {
  HvEmptyState,
  HvLoading,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import { useCreateAsset } from "@generated/apiComponents";

export const Component: React.FC = () => {
  const { isLoading, error } = useCreateAsset({});

  if (isLoading) {
    return <HvLoading />;
  }

  if (error) {
    return <HvEmptyState message="Error" icon={undefined} />;
  }

  // TODO: add form
  return <HvTypography>Create asset form</HvTypography>;
};
