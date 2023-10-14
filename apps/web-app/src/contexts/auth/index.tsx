import React, { useEffect, useContext, useState, useCallback } from "react";
import {
  useSession,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import { nextAuthSignIn } from "./next-auth-wraper";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';
import { api, axios } from "@infrastructure";
import { errorToast } from '@components';
import { ServerError } from '@edu-platform/common';
import { useRouter } from 'next/router'


interface IAuthContext {
  isAuthenticated?: boolean;
  user: {
    email?: string,
    image?: string,
    name?: string
  };
  isUserLoading?: boolean;
  userError?: any;
  credentialsSignIn?: UseMutationResult<unknown, ServerError, unknown, unknown>;
  credentialsSignUp?: UseMutationResult<unknown, ServerError, unknown, unknown>;
  signOut?: UseMutationResult<unknown, unknown, unknown, unknown>;
  googleSignIn?: UseMutationResult<unknown, unknown, unknown, unknown>;
}

const AuthContext = React.createContext<IAuthContext>({
  user: undefined
});

export function AuthProvider({ children }) {
  const session = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const credentialsSignIn = useMutation(({ email, password }: { email: string, password: string }) => nextAuthSignIn("credentials", {redirect: false}, { email, password }), {
    onSuccess: (e) => {
      console.log(e)
      setIsAuthenticated(true);
      router.push("/");
    },
    onError: (e: ServerError) => {}
  });

  const credentialsSignUp = useMutation((args: { email: string, password: string, confirmPassword: string, name: string }) => api.SignUp(args), {
    onSuccess: () => {
      router.push("verify-account");
    },
    onError: (e: ServerError) => {}
  });

  const googleSignIn = useMutation(() => nextAuthSignIn("google", {redirect: false}), {
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: (googleSignInError) => {
      console.error({ googleSignInError })
      errorToast("Algo deu errado na autenticação com o Google");
    }
  });

  const getSignOutFunction = useCallback(() => {
    if(!session.data || session.data.user.provider) return () => {};
    return api.SignOut.bind(api);
  }, [session]);

  const signOut = useMutation(getSignOutFunction(), {
    onSuccess: async () => {
      const { url } = await nextAuthSignOut({redirect: false, callbackUrl: "/"});
      console.log({ signOutUrl: url });
      router.push("/");
      setIsAuthenticated(false);
    },
    onError: (error) => console.log("sign out failed:", error)
  });

  useEffect(() => {
    if(session) {
      // console.log({session});
      if(session.status == "authenticated") {
        setIsAuthenticated(true);
        axios.setHeader("authorization", `Bearer ${session.data.token}`);
      } else {
        setIsAuthenticated(false);
        axios.setHeader("authorization", null);
      }
    }
  }, [session]);
  // const googleSignIn = React.useCallback(async () => {
  //   console.log("google");
  //   try {
  //     await nextAuthSignIn("google", { callbackUrl: "/" });
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   setTokenHeaderSet(true);
  // }, []);

  // const signOut = React.useCallback(async () => {
  //   if (session) nextAuthSignOut({ redirect: false });
  //   await credentialsSignOut.apiCall()
  //   handleAuthToken("");
  //   setTokenHeaderSet(false);
  //   setIsAuthenticated(false);
  // }, [session]);

  // useEffect(() => {
  //   if (session) {
  //     handleAuthToken((session.token as { auth_token: string }).auth_token);

  //     // instructor token:
  //     // handleAuthToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODAxODIzNzIsImRhdGEiOnsiaWQiOiJhODVlNDVhMS1lZjk4LTQwZTAtOWQ2NC1mNGNlNDU0ZTQ0YjYiLCJ0b2tlblZlcnNpb24iOjB9LCJpYXQiOjE2NjQ2MzAzNzJ9.BlnT0r56OnlHkvf1DZrAINo40a7HaDWmAPxqbh68LYQ");

  //     // student token:
  //     // handleAuthToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODAzOTExOTAsImRhdGEiOnsiaWQiOiIxMDUyOTg1ODEwMjQzOTE2OTMxMjIiLCJ0b2tlblZlcnNpb24iOjd9LCJpYXQiOjE2NjQ4MzkxOTB9.GgPGt61lFPLUwecLO-VglJYWi19Beoso9EWpMY4CADk");
  //     setTokenHeaderSet(true);
  //     setIsAuthenticated(true);
  //   }
  // }, [session]);

  // useEffect(() => {
    // const token = localStorage.getRefreshToken();
    // // console.log(token)
    // if (token) {
    //   setTokenHeaderSet(true);
    //   handleAuthToken(token);
    //   setIsAuthenticated(true);
    // } else {
    //   setIsAuthenticated(false);
    // }
  // }, []);


  // const {
  //   data: user,
  //   loading: userLoading,
  //   error: userError,
  //   mutate: refreshUser,
  // } = useUser(tokenHeaderSet);

  // const [user, setUser] = useState<IGetUserAPIResponse>();
  // useEffect(() => {
  //   setUser(data);
  // }, [data]);


  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        isAuthenticated,
        user: session.data?.user,
        // isUserLoading: userLoading,
        // userError,
        // refreshUser,
        // googleSignIn,
        // credentialsSignIn: {
        //   signIn: credentialsSignIn,
        //   loading: signIn.loading,
        // },
        credentialsSignUp,
        credentialsSignIn,
        signOut,
        // updateUser
        // tokenHeaderSet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
