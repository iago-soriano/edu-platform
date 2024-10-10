"use client";

import { RiLogoutBoxRLine } from "@remixicon/react";
import { DropdownMenuIconWrapper, DropdownMenuItem } from "../DropdownMenu";
import { signOut } from "next-auth/react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../Sheet";
import { Text } from "../Typography/Text";

export function SignOutMenuItem() {
  const handleSignOut = async () => {
    // await fetch(`/api/auth/logout`, { method: "GET" });
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
    // await fetch(`/api/auth/logout`, { method: "GET" });
    signOut();
  };

  return (
    <SheetClose asChild onClick={handleSignOut}>
      <RiLogoutBoxRLine className="size-4" />

      <Text className="flex-1">Sign out</Text>
    </SheetClose>
  );
}
