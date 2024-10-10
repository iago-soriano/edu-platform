import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { decode } from "next-auth/jwt";

export const doKeycloakSignOut = async (session) => {
  // const session = await getServerSession(authOptions);
  if (!session) return;

  const url = `${process.env.KEYCLOAK_URL}/protocol/openid-connect/logout?id_token_hint=${session?.idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL!)}`;
  await fetch(url, { method: "GET" });
};

async function refreshAccessToken(token) {
  // console.log(
  //   process.env.KEYCLOAK_CLIENT_ID,
  //   process.env.KEYCLOAK_CLIENT_SECRET,
  //   token.refresh_token
  // );
  const resp = await fetch(
    `${process.env.KEYCLOAK_URL}/protocol/openid-connect/token`,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID!,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      }),
      method: "POST",
    }
  );

  const refreshToken = await resp.json();
  if (!resp.ok) throw refreshToken;

  return {
    ...token,
    access_token: refreshToken.access_token,
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
}

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_URL,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      // console.log({ token });
      if (account) {
        // console.log({ token, account });
        token.access_token = account.access_token;
        token.id_token = account.id_token;

        token.firstName = decode(account.id_token);
        token.lastName = decode(account.id_token);

        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;

        return token;
      } else if (Math.floor(Date.now() / 1000) < token.expires_at) {
        return token;
      } else {
        try {
          console.log("Needs to refresh token...");
          const refreshedToken = await refreshAccessToken(token);
          return refreshedToken;
        } catch (error) {
          //doKeycloakSignOut();
          // signOut();
          console.log("RefreshAccessTokenError", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },

    async session({ session, token }) {
      // session.access_token = token.access_token;
      // session.id_token = token.id_token;
      // session.error = token.error;
      // console.log({ session, token });

      return {
        ...session,
        user: {
          ...session.user,
          firstName: token.firstName,
          lastName: token.lastName,
        },
      };
      // return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signOut({ session, token }) {
      console.log("Logging out keycloak...");
      doKeycloakSignOut(session);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
