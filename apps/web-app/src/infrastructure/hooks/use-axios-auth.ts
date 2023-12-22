"use client";
import { axios } from "../api/axios";
import { useEffect } from "react";
import { useRefreshToken } from "./use-refresh-token";
import { useSignOut } from "@infrastructure";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";

export const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();
  const signOut = useSignOut();

  useEffect(() => {
    const requestIntercept = axios.setInterceptor(
      "request",
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
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
          await refreshToken();
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${session?.accessToken}`;
          return axios._instance(prevRequest);
        }

        if (error?.response.status === 403) {
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
  }, [session, refreshToken]);

  return axios;
};
