import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AxiosFetcher } from "@infrastructure";

export const axios = new AxiosFetcher(process.env.NEXT_PUBLIC_API_HOST);

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      id: "credentials",
      async authorize(_, req) {
        return axios.post.bind(axios)("sign-in", {
          email: req.query?.email,
          password: req.query?.password,
        });
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // after signin, REDIRECT -> JWT -> SESSION at every page refocus
    async signIn({ user, account, profile, email, credentials }) {
      // happens on sign-in of existing and of new users
      // console.log('SIGN IN');
      // console.log({ user, account, profile, email, credentials });
      if (account.provider == "google") {
        await axios.post.bind(axios)("sign-up/provider", {
          email: user.email,
          id: user.id,
          name: user.name,
          image: user.image,
          provider: "google",
        });
      } else if (account.provider == "credentials") {
        return true;
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      // console.log('REDIRECT');
      // console.log({ url, baseUrl });
      return baseUrl;
    },
    async jwt({ token, account, profile, user }) {
      // happens whenever application mounts or page refocuses
      // account, user and profile only on signin. on refocus, only token.
      // console.log('JWT');
      // console.log({ token, account, profile, user });

      if (user) {
        if (account.provider == "google") {
          token.provider = account.provider;
          return {
            ...user,
            provider: "google",
            name: profile.given_name,
            jwt: account.id_token,
          };
        }

        return {
          jwt: user.token,
          ...user.user,
        };
      }

      return token;
    },
    async session({ session, token, user /** only for database */ }) {
      // happens whenever application mounts or page refocuses
      // console.log("SESSION");
      // console.log({ session, token });
      // whatever property is added here goes to session.data in FE
      const { jwt, ...rest } = token;
      (session as any).token = jwt;
      (session as any).user = rest;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
