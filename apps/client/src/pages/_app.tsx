import { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ThemeSwitcher } from "@hitachivantara/uikit-react-icons";
import {
  HvButton,
  HvHeader,
  HvHeaderActions,
  HvHeaderBrand,
  HvHeaderNavigation,
  NavigationItemProp,
} from "@hitachivantara/uikit-react-core";

import { ThemeContext } from "~/providers/theme";
import HitachiLogo from "~/assets/HitachiLogo";

export default function App() {
  const { toggleTheme } = useContext(ThemeContext);
  const { pathname } = useLocation();

  const paths: { id: string; label: string }[] = [
    { id: "/", label: "Home" },
    { id: "/posts", label: "Posts" },
  ];

  // @ts-ignore
  const navData: NavigationItemProp[] = paths.map(({ id, label }) => ({
    id,
    label: <Link to={id}>{label}</Link>,
  }));

  return (
    <>
      <HvHeader>
        <HvHeaderBrand logo={<HitachiLogo />} name="App" />
        <HvHeaderNavigation data={navData} selected={pathname} />
        <HvHeaderActions>
          <HvButton icon onClick={toggleTheme}>
            <ThemeSwitcher role="presentation" />
          </HvButton>
        </HvHeaderActions>
      </HvHeader>
      <main style={{ paddingTop: 60 }}>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
