import { HvProvider } from "@hitachivantara/uikit-react-core";

export const TestProvider: React.FC = ({ children }) => {
  return <HvProvider>{children}</HvProvider>;
};
