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
      credentials: {
        email: {},
        password: {}
      },
      id: "credentials",
      async authorize(_, req) {
         const resp = await credentialsHandlers.signIn(req.query?.email,req.query?.password);
        if(!resp) return null;
        return {
          ...resp.user,
          token: resp.token
        } || { email: ""}
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // after signin, REDIRECT -> JWT -> SESSION at every page refocus
    async signIn({ user, account, profile, email, credentials }) {
      // happens on sign-in of existing and of new users
      console.log('SIGN IN');
      console.log({ user, account, profile, email, credentials });
      if(account.provider == "google") {
        return googleHandlers.signUp(user.email, user.id, user.name, user.image);
      } else if (account.provider == 'credentials') {
        return true;
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
      // account, user and profile only on signin. on refocus, only token.
      console.log('JWT');
      console.log({ token, account, profile, user });
      if (account) {
        console.log({account})
        token.provider = account.provider;
      }
      if(user) {
        return {
          ...token,
          token: user.token
        }
      }
      return token;
    },
    async session({ session, token, user /** only for database */ }) {
      // happens whenever application mounts or page refocuses
      console.log("SESSION");
      console.log({ session, token, user });
      // whatever property is added here goes to session.data in FE
      (session as any).token = token.token;
      (session as any).provider = token.provider;
      // session.user in FE has user object
      return session;
    },
  },
});
