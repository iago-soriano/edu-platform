import { generateBackgroundColor } from "@styles/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../DropdownMenu";
import { Avatar, AvatarFallback } from "../Avatar";
import { SignOutMenuItem } from "./SignOutButton";
import { Session } from "next-auth";

type ProfileDropDownProps = {
  user: Session["user"];
};

export async function ProfileDropDown({ user }: ProfileDropDownProps) {
  const currentUser = {
    color: generateBackgroundColor(
      user?.firstName ?? "Edu",
      user?.lastName ?? "Platform"
    ),
    initials: `${user.firstName?.[0]?.toLocaleUpperCase() ?? "E"}${user.lastName?.[0]?.toLocaleUpperCase() ?? "P"}`,
  };

  // TODO: horizontal overflow when dropdown is open
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="text-sm font-semibold rounded-full focus:none">
        <Avatar>
          <AvatarFallback
            style={{ backgroundColor: currentUser?.color }}
            className="text-black"
          >
            {currentUser?.initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SignOutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
