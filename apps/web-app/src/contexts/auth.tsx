"use client";
import React, { useEffect } from "react";
import { axios } from "@infrastructure";
import {
  SessionProvider as NextAuthProvider,
  useSession,
} from "next-auth/react";

const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
  const session = useSession();
  useEffect(() => {
    if (session) {
      if (session.status == "authenticated") {
        axios.setHeader("authorization", `Bearer ${session.data.token}`);
      } else {
        axios.setHeader("authorization", null);
      }
    }
  }, [session]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export { NextAuthProvider };
