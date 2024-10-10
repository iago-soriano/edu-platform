import { authOptions } from "./../[...nextauth]/route";
import { getServerSession } from "next-auth";

export const doKeycloakSignOut = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const url = `${process.env.KEYCLOAK_URL}/protocol/openid-connect/logout?id_token_hint=${session?.idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL!)}`;
  await fetch(url, { method: "GET" });
};

export async function GET() {
  try {
    await doKeycloakSignOut();
  } catch (err) {
    console.error(err);
  }

  return new Response();
}
