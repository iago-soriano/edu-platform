"use client";
import React, { useEffect, useState, useContext } from "react";
import { axios } from "@infrastructure";
import {
  SessionProvider as NextAuthProvider,
  useSession,
} from "next-auth/react";

const AuthContext = React.createContext({
  axiosIsAuthed: false,
});

export function AuthProvider({ children }) {
  // const session = useSession();
  // const [axiosIsAuthed, setAxiosIsAuthed] = useState(false);

  // useEffect(() => {
  //   if (session) {
  //     if (session.status == "authenticated") {
  //       axios.setHeader("authorization", `Bearer ${session.data.token}`);
  //       setAxiosIsAuthed(true);
  //     } else {
  //       axios.setHeader("authorization", null);
  //       setAxiosIsAuthed(false);
  //     }
  //   }
  // }, [session]);

  return (
    <AuthContext.Provider value={{ axiosIsAuthed: true }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);
export { NextAuthProvider, useAuthContext };
