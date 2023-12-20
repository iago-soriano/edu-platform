"use client";

import { axios } from "../api/axios";
import { signIn, useSession } from "next-auth/react";
import {
  RefreshTokenRequestBody,
  RefreshTokenResponseBody,
} from "@edu-platform/common/api";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res: RefreshTokenResponseBody = await axios.post("/refresh-token", {
      refreshToken: session?.refreshToken,
    } as RefreshTokenRequestBody);

    if (session) session.accessToken = res.accessToken;
    else signIn();
  };

  return refreshToken;
};
