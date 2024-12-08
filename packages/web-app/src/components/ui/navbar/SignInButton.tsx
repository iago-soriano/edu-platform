"use client";

import { signIn } from "next-auth/react";
import { Button } from "../Button";

export const SignInButton = () => {
  return (
    <Button
      variant="primary"
      onClick={() => signIn("keycloak")}
      className="mt-1"
    >
      Sign in
    </Button>
  );
};
