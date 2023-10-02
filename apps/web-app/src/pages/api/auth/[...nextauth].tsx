import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { googleHandlers } from "./handlers/google";
import { credentialsHandlers } from "./handlers/credentials";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        console.log({credentials, req});
        return credentialsHandlers.signIn("","")
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // happens on sign-in of existing and of new users
      console.log('SIGN IN');
      // console.log({ user, account, profile, email, credentials });
      if(account.provider == "google") {
        return googleHandlers.signUp(user.email, user.id, user.name, user.image);
      }
      return ""
    },
    async redirect({ url, baseUrl }) {
      console.log('REDIRECT');
      // console.log({ url, baseUrl });
      return baseUrl;
    },
    async jwt({ token, account, profile, user }) {
      // happens whenever application mounts or page refocuses
      console.log('JWT');
      // console.log({ token, account, profile, user });
      if (account) {
        console.log({account})
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token, user /** only for database */ }) {
      // happens whenever application mounts or page refocuses
      console.log("SESSION");
      console.log({ session, token, user });
      (session as any).token = token.token;
      (session as any).provider = token.provider;
      return session;
    },
  },
});
