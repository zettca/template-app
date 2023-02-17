import { Suspense } from "react";
import { HvProvider } from "@hitachivantara/uikit-react-core";

export const TestProvider: React.FC = ({ children }) => {
  return (
    <Suspense fallback>
      <HvProvider>{children}</HvProvider>
    </Suspense>
  );
};
