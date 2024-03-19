import { axios } from "../api/axios";
import { Session } from "next-auth";
import {
  RefreshTokenRequestBody,
  RefreshTokenResponseBody,
} from "@edu-platform/common/api";

export const refreshToken = async (session: {
  data: Session | null;
  update?: (data?: any) => Promise<Session | null>;
}) => {
  const res: RefreshTokenResponseBody = await axios.post("/refresh-token", {
    refreshToken: session?.data?.user.refreshToken,
  } as RefreshTokenRequestBody);
  if (session.update)
    await session.update({
      ...session.data,
      user: {
        ...session?.data?.user,
        ...res,
      },
    });
  if (session?.data?.user?.accessToken && session?.data?.user?.refreshToken) {
    session.data.user.accessToken = res.accessToken;
    session.data.user.refreshToken = res.refreshToken;
  }
};
