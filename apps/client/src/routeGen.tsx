import { Fragment } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import {
  generatePreservedRoutes,
  generateRegularRoutes,
} from "./routeGenUtils";

type RouteModule = Pick<
  RouteObject,
  "Component" | "action" | "loader" | "ErrorBoundary"
> & { default?: React.ComponentType };

const PRESERVED = import.meta.glob<RouteModule>(
  "/src/routes/(_app|404).{jsx,tsx}",
  { eager: true }
);
const ROUTES = import.meta.glob<RouteModule>([
  "/src/routes/**/[\\w[-]*.{jsx,tsx}",
  "!**/(_app|404).*",
]);

const preservedRoutes = generatePreservedRoutes<React.VFC>(PRESERVED);

const regularRoutes = generateRegularRoutes<
  RouteObject,
  () => Promise<Partial<RouteModule>>
>(ROUTES, (module, key) => {
  const index =
    /index\.(jsx|tsx)$/.test(key) && !key.includes("routes/index")
      ? { index: true }
      : {};

  return {
    ...index,
    lazy: async () => {
      const {
        Component,
        ErrorBoundary,
        loader,
        action,
        default: defaultExport,
      } = await module();
      return {
        Component: Component ?? defaultExport,
        ErrorBoundary,
        loader,
        action,
      };
    },
  };
});

const App = preservedRoutes?.["_app"] || Outlet;
const NotFound = preservedRoutes?.["404"] || Fragment;

export const routes = [...regularRoutes, { path: "*", element: <NotFound /> }];
const router = createBrowserRouter([{ element: <App />, children: routes }]);

export const Router = () => <RouterProvider router={router} />;
