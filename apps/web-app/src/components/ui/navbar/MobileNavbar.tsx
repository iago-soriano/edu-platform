import { Logo } from "./logo";
import { Button } from "../..//ui/Button";
import { Divider } from "../../ui/Divider";
import { LinkButton } from "../../ui/LinkButton";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../../ui/Sheet";
import { RiAlignLeft } from "@remixicon/react";
import { Text } from "../../ui/Typography/Text";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { getNavButtons } from "./get-nav-buttons";
import { SignOutMobileButton } from "./SignOutButton";
import { SignInButton } from "./SignInButton";
import { HamburguerButton } from "./hamburguer";

export async function MobileNavbar() {
  const session = await getServerSession();
  const navButtons = getNavButtons(session);

  return (
    <div className="z-[999] fixed top-0 left-0 w-full bg-gray-50 flex items-center justify-between container h-16 border-b md:hidden  dark:bg-background">
      <Link href="/home">
        <Logo />
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <HamburguerButton />
        </SheetTrigger>
        <SheetContent className="pt-20">
          <span className="absolute top-4 left-6 m-2">
            <Logo />
          </span>

          {[...navButtons.left, ...navButtons.right].map((item) => (
            <div key={item.route}>
              <SheetClose asChild>
                <LinkButton
                  href={item.route}
                  className="w-full text-start"
                  variant="ghost"
                >
                  <Text className="flex-1">{item.header}</Text>
                </LinkButton>
              </SheetClose>

              <Divider className="my-2" />
            </div>
          ))}

          <SheetClose asChild>
            {session ? <SignOutMobileButton /> : <SignInButton />}
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}
