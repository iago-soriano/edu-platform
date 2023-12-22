import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import { SmallScreenNavbar } from "./small-screen";
import { BigScreenNavbar } from "./big-screen";
import { ModeToggle } from "./components";
import { useHasMounted, useSignOut } from "@infrastructure";
import { useSession } from "next-auth/react";

export const Navbar = () => {
  const isBigScreen = useMediaQuery({ minWidth: 900 });
  const pathName = usePathname();
  const hasMounted = useHasMounted();
  const session = useSession();
  const isAuthenticated = session.status == "authenticated";
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
    <SmallScreenNavbar
      currentPath={pathName}
      modeToggle={<ModeToggle />}
      isAuthenticated={isAuthenticated}
      signOut={handleSignOut}
    />
  );
};
