import Link from "next/link";
import { Logo } from "./logo";
import { NavItem } from "./NavItem";
import { MobileNavbar } from "./MobileNavbar";
import { ProfileDropDown } from "./ProfileDropDown";
import { SignInButton } from "./SignInButton";
import { getServerSession } from "next-auth";
import { getNavButtons } from "./get-nav-buttons";
import { authOptions } from "../../../app/api/auth/[...nextauth]/auth-options";

export async function Navbar() {
  const session = await getServerSession(authOptions);

  const navButtons = getNavButtons(session);

  return (
    <>
      <div className="z-[999] box-border fixed top-0 left-0 border-b w-full bg-gray-50 dark:bg-black/10 shadow-sm px-6 lg:px-10 h-16 hidden md:flex items-center gap-12">
        <Link href="/home#hero">
          <Logo className="w-20 flex flex-col justify-center items-center h-full transition-opacity hover:opacity-80 focus-visible:opacity-80" />
        </Link>
        <nav className="w-full flex flex-row justify-between items-center gap-8 mb-[1px] text-sm ">
          <div className="flex flex-row gap-4">
            {navButtons.left.map(({ route, header }) => (
              <NavItem key={route} href={route}>
                {header}
              </NavItem>
            ))}
          </div>
          <div className="flex flex-row items-center gap-4">
            {navButtons.right.map(({ route, header }) => (
              <NavItem key={route} href={route}>
                {header}
              </NavItem>
            ))}
            {session?.user ? (
              <ProfileDropDown user={session.user} />
            ) : (
              <SignInButton />
            )}
          </div>
        </nav>
      </div>
      <MobileNavbar />
    </>
  );
}
