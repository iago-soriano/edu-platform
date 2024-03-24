import { AxiosFetcher } from "./axios-fetcher";
import { getServerSession, refreshToken } from "./auth";

export const SSRAxios = new AxiosFetcher(process.env.NEXT_PUBLIC_API_HOST!);
SSRAxios.setInterceptor(
  "request",
  async (config) => {
    if (typeof window == "undefined") {
      const session = await getServerSession();
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

SSRAxios.setInterceptor(
  "response",
  (response) => response,
  async function (error) {
    if (typeof window == "undefined") {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        const session = await getServerSession();
        prevRequest.sent = true;
        console.log("refresh server-side");
        await refreshToken({ data: session });
        prevRequest.headers[
          "Authorization"
        ] = `Bearer ${session?.user?.accessToken}`;
        return this._instance(prevRequest);
      }
    }

    return Promise.reject(error);
  }
);
