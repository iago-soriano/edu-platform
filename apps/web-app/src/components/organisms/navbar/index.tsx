"use client"; // TODO: make this server component
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import { SmallScreenNavbar } from "./small-screen";
import { BigScreenNavbar } from "./big-screen";
import { ModeToggle, Logo } from "./components";
import { useHasMounted, useSignOut } from "@infrastructure";
import { useSession } from "next-auth/react";

export const Navbar = () => {
  const isBigScreen = useMediaQuery({ minWidth: 900 });
  const pathName = usePathname();
  const hasMounted = useHasMounted();
  const session = useSession();
  const isAuthenticated =
    session.status == "authenticated" || session.status == "loading";
  const user = session.data?.user;
  const handleSignOut = useSignOut();

  if (hasMounted) {
    if (isBigScreen)
      return (
        <BigScreenNavbar
          currentPath={pathName}
          modeToggle={<ModeToggle />}
          user={user}
          isAuthenticated={isAuthenticated}
          signOut={handleSignOut}
        />
      );
    return (
      <SmallScreenNavbar
        currentPath={pathName}
        modeToggle={<ModeToggle />}
        isAuthenticated={isAuthenticated}
        signOut={handleSignOut}
      />
    );
  }

  return (
    <nav className="justify-between max-w-full h-[6.7rem]">
      <ul className="flex flex-row justify-between overflow-hidden h-full">
        <li>
          <Logo />
        </li>
        <li />
      </ul>
    </nav>
  );
};
