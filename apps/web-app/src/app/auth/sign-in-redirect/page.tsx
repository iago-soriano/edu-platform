"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function LogOutPage() {
  useEffect(() => {
    // TODO: make it redirect to where user was before
    signOut({ redirect: true, callbackUrl: "/home" });
  }, []);
}
