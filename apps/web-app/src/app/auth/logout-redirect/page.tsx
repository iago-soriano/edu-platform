"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function LogOutPage() {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: "/home#hero" });
  }, []);
}
