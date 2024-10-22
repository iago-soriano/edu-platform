"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function Page() {
  useEffect(() => {
    // TODO: make it redirect to where user was before
    signOut();
    window.location.href = "/home#hero";
  }, []);
}
