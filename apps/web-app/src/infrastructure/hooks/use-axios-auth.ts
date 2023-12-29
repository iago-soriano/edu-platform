"use client";
import { axios } from "../api/axios";
import { useEffect } from "react";
import { useSignOut, refreshToken } from "@infrastructure";
import { useSession } from "next-auth/react";

const useRefreshToken = () => {
  const session = useSession();
  return async () => await refreshToken(session);
};

export const useAxiosAuth = () => {
  const session = useSession();
  const signOut = useSignOut();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axios.setInterceptor(
      "request",
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${session?.data?.user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axios.setInterceptor(
      "response",
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refresh();
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${session?.data?.user.accessToken}`;
          return axios._instance(prevRequest);
        }

        if (error?.response?.status === 403) {
          signOut();
          return;
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.ejectInterceptor("request", requestIntercept);
      axios.ejectInterceptor("response", responseIntercept);
    };
  }, [session.data, refresh]);

  return axios;
};
