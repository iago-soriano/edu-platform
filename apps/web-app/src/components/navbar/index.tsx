"use client";
import { useMediaQuery } from "react-responsive";
import { SmallScreenNavbar } from "./small-screen";
import { BigScreenNavbar } from "./big-screen";
import { useHasMounted, useSessionData } from "@infrastructure";

export const Navbar = () => {
  const isBigScreen = useMediaQuery({ minWidth: 900 });
  const { user, isAuthenticated } = useSessionData();

  const handleSignOut = console.log("sign out");

  const hasMounted = useHasMounted();

  if (hasMounted && !isBigScreen) {
    return (
      <SmallScreenNavbar
        isAuthenticated={isAuthenticated}
        signOut={handleSignOut}
      />
    );
  }

  return (
    <BigScreenNavbar
      user={user}
      isAuthenticated={isAuthenticated}
      signOut={handleSignOut}
    />
  );
};
