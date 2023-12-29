import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession as nextAuthGetServerSession } from "next-auth";
import { getSession as nextAuthGetSession } from "next-auth/react";

export const getServerSession = () => nextAuthGetServerSession(authOptions);
// export const getSession = () => nextAuthGetSession(authOptions);

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
    if (session?.data)
      signOutMutation.mutate({ refreshToken: session.data.user.refreshToken });
  };

  return doSignOut;
};
