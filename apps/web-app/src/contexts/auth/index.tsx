import React, { useEffect, useContext, useState, useCallback } from "react";
import {
  useSession,
  signOut as nextAuthSignOut,
  // signIn as nextAuthSignIn,
} from "next-auth/react";
import { nextAuthSignIn } from "./next-auth-wraper";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';
import { LocalStorageHelper, api, axios } from "@infrastructure";
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
  // refreshUser?: () => void;
  // googleSignIn?: () => Promise<any>;
  credentialsSignIn?: UseMutationResult<unknown, ServerError, unknown, unknown>;
  credentialsSignUp?: UseMutationResult<unknown, ServerError, unknown, unknown>;
  // credentialsSignUp?: SignUp;
  signOut?: UseMutationResult<unknown, unknown, unknown, unknown>;
  googleSignIn?: UseMutationResult<unknown, unknown, unknown, unknown>;
  // updateUser?: () => void;
  // tokenHeaderSet: boolean;
}

// export const handleAuthToken = (token: string) => {
//   setCommonHeaders("authorization", `Bearer ${token}`);
//   if (token) localStorage.setRefreshToken(token);
//   else localStorage.deleteRefreshToken();
//   // setCookie(undefined, "language-app.token", token, {
//   //   maxAge: 60 * 60 * 1, // 1 hour
//   // });
// };

const AuthContext = React.createContext<IAuthContext>({
  user: undefined
  // tokenHeaderSet: false,
});

const localStorage = new LocalStorageHelper();

export function AuthProvider({ children }) {
  const session = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenHeaderSet, setTokenHeaderSet] = React.useState(false);
  const router = useRouter();

  const credentialsSignIn = useMutation(async ({ email, password }: { email: string, password: string }) => await nextAuthSignIn("credentials", {redirect: false}, { email, password }), {
    onSuccess: (e) => {
      console.log(e)
      setIsAuthenticated(true);
      router.push("/");
    },
    // onError: (e: ServerError) => {
    //   errorToast(e.message);
    // }
  });

  const credentialsSignUp = useMutation((args: { email: string, password: string, confirmPassword: string, name: string }) => api.SignUp(args), {
    onSuccess: () => {
      router.push("verify-account");
    },
    onError: (e: ServerError) => {
      errorToast(e.message);
    }
  });

  const googleSignIn = useMutation(() => nextAuthSignIn("google"), {
    onSuccess: (googleSignUpResp) => {
      console.log({googleSignUpResp})
      // axios.setHeader("edu-platform.auth", token)
      setIsAuthenticated(true);
    },
    onError: (error) => console.log(error)
  });

  const getSignOutFunction = useCallback(() => {
    if(!session.data || !session.data.provider) return () => {};
    return api.SignOut.bind(api);
  }, [session]);

  const signOut = useMutation(getSignOutFunction(), {
    onSuccess: async () => {
      const { url } = await nextAuthSignOut({redirect: false, callbackUrl: "/"});
      console.log({ signOutUrl: url });
      router.push("/");
      // axios.setHeader("edu-platform.auth", "");
      setIsAuthenticated(false);
    },
    onError: (error) => console.log("sign out failed:", error)
  });

  useEffect(() => {
    if(session) {
      console.log({session});
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
