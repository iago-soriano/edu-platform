"use client";
import { useMediaQuery } from "react-responsive";
import { SmallScreenNavbar } from "./small-screen";
import { BigScreenNavbar } from "./big-screen";
import { useHasMounted, useSignOut, useSessionData } from "@infrastructure";

export const Navbar = () => {
  const isBigScreen = useMediaQuery({ minWidth: 900 });
  const { user, isAuthenticated } = useSessionData();

  const handleSignOut = useSignOut();

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
