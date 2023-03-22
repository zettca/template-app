import React, { Suspense } from "react";
import { Routes } from "./routeGen";

import AppProvider from "./providers/app";
import ThemeProvider from "./providers/theme";

function App() {
  return (
    <React.StrictMode>
      <Suspense fallback="Loading app...">
        <AppProvider>
          <ThemeProvider>
            <Routes />
          </ThemeProvider>
        </AppProvider>
      </Suspense>
    </React.StrictMode>
  );
}

export default App;
