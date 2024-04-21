import { Session } from "next-auth";
import {
  RefreshTokenRequestBody,
  RefreshTokenResponseBody,
} from "@edu-platform/common/api";
import { AxiosFetcher } from "../axios-fetcher";

export const refreshToken = async (session: {
  data: Session | null;
  update?: (data?: any) => Promise<Session | null>;
}) => {
  const axios = new AxiosFetcher(process.env.NEXT_PUBLIC_AUTH_API_HOST!);

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
