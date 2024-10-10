import { useMediaQuery } from "react-responsive";
import { SmallScreenNavbar } from "./small-screen";
import { BigScreenNavbar } from ".";
import { useHasMounted } from "@infrastructure";

export const Navbar = () => {
  const isBigScreen = useMediaQuery({ minWidth: 900 });

  const hasMounted = useHasMounted();

  if (hasMounted && !isBigScreen) {
    return <SmallScreenNavbar />;
  }

  return <BigScreenNavbar />;
};
