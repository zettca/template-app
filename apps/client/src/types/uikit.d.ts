import type {
  HvAccentColors,
  HvAtmosphereColors,
  HvBaseColors,
  HvSemanticColors,
  HvSupportColors,
  HvTheme as HvThemeObject,
} from "@hitachivantara/uikit-react-core";

export type HvColors = HvAccentColors &
  HvAtmosphereColors &
  HvBaseColors &
  HvSemanticColors &
  HvSupportColors;

export interface ThemeObject extends HvThemeObject {
  /** @deprecated use `theme.palette` instead */
  palette: HvThemeObject["palette"];
  /** @deprecated use `theme.hvSpacing` instead */
  spacing: HvThemeObject["spacing"];
}

export interface HvTheme {
  hv: ThemeObject;
  palette: HvColors;
  hvSpacing: (...args: (number | string)[]) => string;
}
