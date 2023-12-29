import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string;
      name: string;
      image: string;
      provider: string;
      id: string;

      accessToken: string;
      refreshToken: string;
    };
  }

  interface User {
    // make these properties not mandatory, so that I can have them inside user object
    id?: string;
    name?: string;
    email?: string;
    image?: string;

    accessToken: string;
    refreshToken: string;
    user: {
      email: string;
      name: string;
      image: string;
    };
  }

  interface Profile {
    given_name: string;
  }

  interface UserCredentialsConfig {}
}
