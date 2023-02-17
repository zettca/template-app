export const patterns = {
  route: [/^\/src\/pages\/|^\/pages\/|\.(jsx|tsx)$/g, ""],
  splat: [/\[\.{3}\w+\]/g, "*"],
  param: [/\[([^\]]+)\]/g, ":$1"],
  slash: [/^index$|\./g, "/"],
  optional: [/^-(:?[\w-]+)/g, "$1?"],
} as const;

type PreservedKey = "_app" | "404";
type BaseRoute = {
  id?: string;
  path?: string;
  children?: BaseRoute[];
} & Record<string, any>;

export const generatePreservedRoutes = <T>(
  files: Record<string, T | any>
): Partial<Record<PreservedKey, T>> => {
  return Object.keys(files).reduce((routes, key) => {
    const path = key.replace(...patterns.route);
    return { ...routes, [path]: files[key]?.default };
  }, {});
};

export const generateRegularRoutes = <T extends BaseRoute, M>(
  files: Record<string, any>,
  buildRoute: (module: M, key: string) => T
) => {
  const filteredRoutes = Object.keys(files).filter(
    (key) => !key.includes("/_") || /_layout\.(jsx|tsx)$/.test(key)
  );
  return filteredRoutes.reduce<T[]>((routes, key) => {
    const module = files[key];
    const route = {
      id: key.replace(...patterns.route),
      ...buildRoute(module, key),
    };

    const segments = key
      .replace(...patterns.route)
      .replace(...patterns.splat)
      .replace(...patterns.param)
      .replace(...patterns.optional)
      .split("/")
      .filter(Boolean);

    segments.reduce((parent, segment, index) => {
      const path = segment.replace(...patterns.slash);
      const root = index === 0;
      const leaf = index === segments.length - 1 && segments.length > 1;
      const node = !root && !leaf;
      const layout = segment === "_layout";
      const group = /\(\w+\)/.test(path);
      const insert = /^\w|\//.test(path) ? "unshift" : "push";

      if (root) {
        const last = segments.length === 1;
        if (last) {
          routes.push({ path, ...route });
          return parent;
        }
      }

      if (root || node) {
        const current = root ? routes : parent.children;
        const found = current?.find(
          (route) => route.path === path || route.id === path
        );
        const props = group ? { id: path } : { path };
        if (found) found.children ??= [];
        else current?.[insert]({ ...props, children: [] });
        return (
          found ||
          (current?.[
            insert === "unshift" ? 0 : current.length - 1
          ] as BaseRoute)
        );
      }

      if (layout) {
        return Object.assign(parent, {
          ...route,
          id: parent.id || parent.path,
        });
      }

      if (leaf) {
        parent?.children?.[insert](route?.index ? route : { path, ...route });
      }

      return parent;
    }, {} as BaseRoute);

    return routes;
  }, []);
};
