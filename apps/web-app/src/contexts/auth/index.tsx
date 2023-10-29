import React, { useEffect, useContext, useState, useCallback } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { axios } from "@infrastructure";

const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
  const session = useSession();
  useEffect(() => {
    if (session) {
      console.log({ session });
      if (session.status == "authenticated") {
        axios.setHeader("authorization", `Bearer ${session.data.token}`);
      } else {
        axios.setHeader("authorization", null);
      }
    }
  }, [session]);
  // const credentialsSignUp = useMutation(
  //   (args: {
  //     email: string;
  //     password: string;
  //     confirmPassword: string;
  //     name: string;
  //   }) => api.SignUp(args),
  //   {
  //     onSuccess: () => {
  //       router.push("verify-account");
  //     },
  //     onError: (e: ServerError) => {},
  //   }
  // );

  // const googleSignIn = useMutation(
  //   () => nextAuthSignIn("google", { redirect: false }),
  //   {
  //     onSuccess: () => {
  //       setIsAuthenticated(true);
  //     },
  //     onError: (googleSignInError) => {
  //       console.error({ googleSignInError });
  //       errorToast("Algo deu errado na autenticação com o Google");
  //     },
  //   }
  // );

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
