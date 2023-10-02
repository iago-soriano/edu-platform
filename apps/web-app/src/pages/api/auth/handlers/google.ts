import { AxiosFetcher } from "@infrastructure";
import { ApiClient } from "@edu-platform/common/api";

export const axios = new AxiosFetcher(process.env.NEXT_PUBLIC_API_HOST);
export const api = new ApiClient(axios);

export const googleHandlers = {
  signUp: async (email: string, id: string, name: string, image: string) => {
    try {
      await api.ProviderSignUp({
        email,
        id,
        name,
        image,
        provider: "google",
      });
      return true;
    } catch (e) {
      return `/sign-up?error=Error Message${e.message}`;
    }
  },
  signIn: async (email: string) => {
    // try {
    //   const { token } = await api.ProviderSignIn({
    //     email,
    //     provider: "google",
    //   });
    //   return token;
    // } catch (e) {
    //   console.log({ e });
    //   return;
    // }
  },
  session: () => {},
};
