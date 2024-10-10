"use client";

import { signIn } from "next-auth/react";
import { Button } from "../Button";

export const SignInButton = () => {
  return (
    <Button variant="primary" onClick={() => signIn("keycloak")}>
      Sign in
    </Button>
  );
};
