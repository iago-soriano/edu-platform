"use client";

import { RiLogoutBoxRLine } from "@remixicon/react";
import { DropdownMenuIconWrapper, DropdownMenuItem } from "../DropdownMenu";
import { signOut } from "next-auth/react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../Sheet";
import { Text } from "../Typography/Text";
import { Button } from "../Button";

export function SignOutMenuItem() {
  const handleSignOut = async () => {
    signOut();
  };

  return (
    <DropdownMenuItem role="button" onClick={handleSignOut}>
      <span className="flex items-center gap-x-2">
        <DropdownMenuIconWrapper>
          <RiLogoutBoxRLine className="size-4" />
        </DropdownMenuIconWrapper>
        Sign out
      </span>
    </DropdownMenuItem>
  );
}

export function SignOutMobileButton() {
  const handleSignOut = async () => {
    signOut();
  };

  return (
    <Button onClick={handleSignOut} variant="outline" className="mt-1">
      <RiLogoutBoxRLine className="size-4" />
      Sign out
    </Button>
  );
}
