import { useRefreshToken } from "./use-refresh-token";
import { AxiosFetcher } from "../api/axios-fetcher";
import { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useSignOut } from "./use-sign-out";

const axios = new AxiosFetcher(process.env.NEXT_PUBLIC_CORE_API_HOST!);

export const useAxiosAuth = () => {
  const session = useSession();
  const signOut = useSignOut();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axios.setInterceptor(
      "request",
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] =
            `Bearer ${session?.data?.user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axios.setInterceptor(
      "response",
      (response) => response,
      async (error) => {
        console.log("error", error);
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refresh();
          prevRequest.headers["Authorization"] =
            `Bearer ${session?.data?.user.accessToken}`;
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
