import { AxiosFetcher } from "@infrastructure";
import { ApiClient } from "@edu-platform/common/api";

export const axios = new AxiosFetcher(process.env.NEXT_PUBLIC_API_HOST);
export const api = new ApiClient(axios);

export const googleHandlers = {
  signUp: async (email: string, id: string, name: string, image: string) => {
    // try {
      return api.ProviderSignUp({
        email,
        id,
        name,
        image,
        provider: "google",
      });
    //   return true;
    // } catch (e) {
    //   return `/sign-up?error=Error Message${e.message}`;
    // }
  },
  signIn: async (email: string) => {
    // try {
      const resp = await api.ProviderSignIn({
        email,
        provider: "google",
      });
      return resp;
    //   return resp;
    // } catch (e) {
    //   return `/sign-up?error=Error Message${e.message}`;
    // }
  },
  session: () => {},
};
