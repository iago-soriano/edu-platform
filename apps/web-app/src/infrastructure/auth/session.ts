import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession as nextAuthGetServerSession } from "next-auth";

export const getServerSession = () => nextAuthGetServerSession(authOptions);

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSignOutMutation } from "@infrastructure";

export const useSignOut = () => {
  const router = useRouter();
  const session = useSession();
  const signOutMutation = useSignOutMutation();

  const doSignOut = () => {
    signOut({
      redirect: false,
      callbackUrl: "/",
    });
    router.replace("/");
    if (session.data)
      signOutMutation.mutate({ refreshToken: session.data.refreshToken });
  };

  return doSignOut;
};
