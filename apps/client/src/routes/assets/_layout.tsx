import { Outlet } from "react-router-dom";
import { HvContainer } from "@hitachivantara/uikit-react-core";

export const Component: React.FC = () => {
  return (
    <HvContainer maxWidth="xl">
      <Outlet />
    </HvContainer>
  );
};
