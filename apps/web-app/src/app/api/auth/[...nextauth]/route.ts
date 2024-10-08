import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import axiosBase from "axios";
import {
  ProviderSignUpRequestBody,
  ProviderSignUpResponseBody,
} from "@edu-platform/common/api";
import { AxiosFetcher } from "../../../../infrastructure/api/axios-fetcher";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      id: "credentials",
      async authorize(_, req) {
        // const axios = axiosBase.create({
        //   url: process.env.NEXT_PUBLIC_API_HOST!,
        // });
        console.log(_, req);
        const axios = new AxiosFetcher(process.env.NEXT_PUBLIC_API_HOST!);

        return await axios.post.bind(axios)("iam/sign-in", {
          email: req.query?.email,
          password: req.query?.password,
        });
      },
    }),
  ],
  // session: {
  //   strategy: ,
  // },
  callbacks: {
    // after signin, REDIRECT -> JWT -> SESSION at every page refocus
    async signIn({ user, account, profile, email, credentials }) {
      // happens on sign-in of existing and of new users
      // console.log("SIGN IN");
      // console.log({ user, account, profile, email, credentials });
      if (account?.provider == "google") {
        // const axios = axiosBase.create({
        //   url: process.env.NEXT_PUBLIC_API_HOST!,
        // });
        const axios = new AxiosFetcher(process.env.NEXT_PUBLIC_API_HOST!);

        const { refreshToken, accessToken } = (await axios.post.bind(axios)(
          "sign-up/provider",
          {
            email: user.email,
            name: user.name,
            image: user.image,
            provider: "google",
          } as ProviderSignUpRequestBody
        )) as ProviderSignUpResponseBody;

        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      // console.log('REDIRECT');
      // console.log({ url, baseUrl });
      return baseUrl;
    },
    async jwt({ token, account, profile, user, trigger, session }) {
      // happens whenever application mounts or page refocuses
      // account, user and profile only on signin. on refocus, only token.
      // console.log('JWT');
      // console.log({ token, account, profile, user });

      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      if (user) {
        return {
          ...user,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          name: profile?.given_name || user.name,
          provider: account?.provider,
        };
      }

      return token;
    },
    async session({ session, token, user /** only for database */ }) {
      // happens whenever application mounts or page refocuses
      // console.log("SESSION");
      // console.log({ session, token });
      // whatever property is added here goes to session.data in FE
      // const { accessToken, refreshToken, ...rest } = token;

      // (session as any).accessToken = accessToken;
      // (session as any).refreshToken = refreshToken;
      (session as any).user = token;

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    error: "/iam/sign-in",
  },
  // jwt: {
  //   async encode(params: {
  //     token: JWT;
  //     secret: string;
  //     maxAge: number;
  //   }): Promise<string> {
  //     console.log({ token: params.token });
  //     // return a custom encoded JWT string

  //     return params.token.jwt as string;
  //   },
  //   async decode(params: {
  //     token: string;
  //     secret: string;
  //   }): Promise<JWT | null> {
  //     // return a `JWT` object, or `null` if decoding failed
  //     return { jwt: params.token };
  //   },
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
