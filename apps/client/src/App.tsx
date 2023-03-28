import React, { Suspense } from "react";
import { Router } from "./routeGen";

import AppProvider from "./providers/app";
import ThemeProvider from "./providers/theme";

function App() {
  return (
    <React.StrictMode>
      <Suspense fallback="Loading app...">
        <AppProvider>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </AppProvider>
      </Suspense>
    </React.StrictMode>
  );
}

export default App;
