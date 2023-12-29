"use client";
import {
  RefreshTokenRequestBody,
  RefreshTokenResponseBody,
} from "@edu-platform/common/api";
import { useSession } from "next-auth/react";
import { axios } from "../api/axios";

export const useRefreshToken = () => {
  const session = useSession();
  console.log("in useRefresh", { session });
  // return async () => await refreshToken(session);
  const refresh = async () => {
    console.log("to refresh", { session });
    const res: RefreshTokenResponseBody = await axios.post("/refresh-token", {
      refreshToken: session?.data?.user.refreshToken,
    } as RefreshTokenRequestBody);
    console.log("refreshed - client");
    // if (session.update)
    //   await session.update({
    //     ...session.data,
    //     user: {
    //       ...session.data.user,
    //       ...res,
    //     },
    //   });
    session.data.user.accessToken = res.accessToken;
    session.data.user.refreshToken = res.refreshToken;
  };

  return refresh;
};
