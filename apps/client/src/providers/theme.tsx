import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  HvCssBaseline,
  HvProvider,
  HvUiKitThemeNames,
} from "@hitachivantara/uikit-react-core";
import { useMediaQuery } from "@mui/material";
import Loading from "~/components/common/Loading";
import { setCookie, getCookie } from "~/utils/cookie";
import { noop } from "~/utils";

export interface ThemeContextType {
  theme: HvUiKitThemeNames;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "dawn",
  toggleTheme: noop,
});

export interface ThemeProviderProps {
  seed?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const initialTheme = getCookie("theme") === "wicked" ? "wicked" : "dawn";
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState<HvUiKitThemeNames>(initialTheme);
  const { i18n } = useTranslation();

  useEffect(() => {
    const themeCookie = getCookie("theme") as HvUiKitThemeNames | undefined;
    setTheme(themeCookie || (prefersDarkMode && "wicked") || "dawn");
  }, [prefersDarkMode]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dawn" ? "wicked" : "dawn";
    setTheme(newTheme);
    setCookie("theme", newTheme);
  }, [theme]);

  const contextValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <HvProvider uiKitTheme={theme} locale={i18n.language}>
        <HvCssBaseline />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </HvProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
