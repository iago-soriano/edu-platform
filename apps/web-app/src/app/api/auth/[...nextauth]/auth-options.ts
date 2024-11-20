import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import jwt, { JwtPayload as LibJWTPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

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

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_URL,
    }),
  ],
  events: {
    async signOut({ session, token }) {
      console.log("Logging out keycloak...", token);
      const url = `${process.env.KEYCLOAK_URL}/protocol/openid-connect/logout?id_token_hint=${token?.id_token}&post_logout_redirect_uri=${encodeURIComponent(`${process.env.NEXTAUTH_URL!}/home#hero`)}`;
      const resp = await fetch(url, { method: "GET" });
    },
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // console.log({ token, account });
        token.access_token = account.access_token;
        token.id_token = account.id_token;

        const idTokenPayload = jwt.verify(
          account?.id_token || "",
          `-----BEGIN PUBLIC KEY-----\n${process.env.KEYCLOAK_RSA_PUBLIC_KEY}\n-----END PUBLIC KEY-----`,
          {
            algorithms: ["RS256"],
          }
        ) as any;

        token.firstName = idTokenPayload?.given_name;
        token.lastName = idTokenPayload?.family_name;

        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;

        return token;
      } else if (Math.floor(Date.now() / 1000) < (token.expires_at as number)) {
        return token;
      } else {
        try {
          console.log("Needs to refresh token...");
          const refreshedToken = await refreshAccessToken(token);
          return refreshedToken;
        } catch (error) {
          console.log("RefreshAccessTokenError", error);
          redirect("/auth/sign-in-redirect");
        }
      }
    },

    async session({ session, token }) {
      // console.log("session", token.access_token);

      session.access_token = token.access_token as string;
      session.id_token = token.id_token as string;
      session.error = token.error as string;

      return {
        ...session,
        user: {
          ...session.user,
          firstName: token.firstName,
          lastName: token.lastName,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return url;
    },
  },
};
