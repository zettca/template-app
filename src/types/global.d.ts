/* eslint-disable @typescript-eslint/no-empty-interface, dot-notation */
import type { HvColors, HvTheme } from "./uikit";

// extend Material-UI's Theme to include UI-Kit's theme keys
declare module "@mui/material" {
  interface Theme extends HvTheme {}
  interface ThemeOptions extends HvTheme {}
  interface Palette extends HvColors {}
}

declare module "*.html" {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}
