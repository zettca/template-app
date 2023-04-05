import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useMemo } from "react";
import { configureI18n } from "~/utils/i18next";
import { clientConfig, tRpc } from "~/utils/trpc";

export type AppContentType = {};

export const AppContent = createContext<AppContentType>({});

export type AppProviderProps = {};

/** Provider of global app context */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const queryClient = useMemo(() => new QueryClient(), []);
  const trpcClient = useMemo(() => tRpc.createClient(clientConfig), []);

  const contextValue = useMemo(
    () => ({ queryClient, trpcClient }),
    [queryClient, trpcClient]
  );

  useMemo(() => {
    configureI18n();
  }, []);

  return (
    <AppContent.Provider value={contextValue}>
      <tRpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </tRpc.Provider>
    </AppContent.Provider>
  );
};

export default AppProvider;
