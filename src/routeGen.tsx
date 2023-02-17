import { Fragment, lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import type {
  ActionFunction,
  RouteObject,
  LoaderFunction,
} from "react-router-dom";

import {
  generatePreservedRoutes,
  generateRegularRoutes,
} from "./routeGenUtils";

type Element = () => JSX.Element;
type Module = {
  default: Element;
  loader: LoaderFunction;
  action: ActionFunction;
  ErrorElement: Element;
};

const PRESERVED = import.meta.glob<Module>("/src/pages/(_app|404).{jsx,tsx}", {
  eager: true,
});
const ROUTES = import.meta.glob<Module>([
  "/src/pages/**/[\\w[]*.{jsx,tsx}",
  "!**/(_app|404).*",
]);

const preservedRoutes = generatePreservedRoutes<Element>(PRESERVED);

const DefaultErrorElement = () => {
  throw useRouteError();
};

const regularRoutes = generateRegularRoutes<RouteObject, () => Promise<Module>>(
  ROUTES,
  (module, key) => {
    const Element = lazy(module);
    const ErrorElement = lazy(() =>
      module().then((module) => ({
        default: module.ErrorElement || DefaultErrorElement,
      }))
    );
    const index = /(?<!pages\/)index\.(jsx|tsx)$/.test(key)
      ? { index: true }
      : {};

    return {
      ...index,
      element: <Suspense fallback={null} children={<Element />} />,
      loader: (...args) =>
        module().then((mod) => mod?.loader?.(...args) || null),
      action: (...args) =>
        module().then((mod) => mod?.action?.(...args) || null),
      errorElement: <Suspense fallback={null} children={<ErrorElement />} />,
    };
  }
);

const App = preservedRoutes?.["_app"] || Fragment;
const NotFound = preservedRoutes?.["404"] || Fragment;

export const routes = [...regularRoutes, { path: "*", element: <NotFound /> }];
const router = createBrowserRouter([
  { element: <App children={<Outlet />} />, children: routes },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
