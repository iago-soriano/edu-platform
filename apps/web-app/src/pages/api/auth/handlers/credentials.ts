import { AxiosFetcher } from "@infrastructure";
import { ApiClient } from "@edu-platform/common/api";

export const axios = new AxiosFetcher(process.env.NEXT_PUBLIC_API_HOST);
export const api = new ApiClient(axios);

export const credentialsHandlers = {
  async signIn(email: string, password: string) {
    return api.SignIn({
        email,
        password,
      });
  },
};
