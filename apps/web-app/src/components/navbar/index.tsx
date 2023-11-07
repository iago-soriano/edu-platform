import { useMediaQuery } from "react-responsive";
import { useRouter, usePathname } from "next/navigation";
import { SmallScreenNavbar } from "./small-screen";
import { BigScreenNavbar } from "./big-screen";
import { ModeToggle } from "./components";
import { useHasMounted, useSignOutMutation } from "@infrastructure";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";

export const Navbar = () => {
  const isBigScreen = useMediaQuery({ minWidth: 900 });
  const router = useRouter();
  const pathName = usePathname();
  const hasMounted = useHasMounted();
  const session = useSession();
  const isAuthenticated = session.status == "authenticated";
  const user = session.data?.user;
  const credentialsSignOut = useSignOutMutation();

  // console.log({ session, user, isAuthenticated });
  const handleSignOut = () => {
    nextAuthSignOut({
      redirect: false,
      callbackUrl: "/",
    });
    router.replace("/product");
    if (session.data && !session.data.user.provider)
      credentialsSignOut.mutate({});
  };

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
