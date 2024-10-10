import { generateBackgroundColor } from "@styles/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../DropdownMenu";
import { Avatar, AvatarFallback } from "../../Avatar";
import { SignOutMenuItem } from "./SignOutMenuItem";

export async function UserNavigation({ user }) {
  const currentUser = {
    color: generateBackgroundColor("Iago", "Soriano"),
    initials: "IS",
  };

  // TODO: horizontal overflow when dropdown is open
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm font-semibold rounded-full mr-5 focus:none">
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
