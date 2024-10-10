import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async ({ children }) => {
  const session = await getServerSession();
  if (!session || !session.user) {
    // TODO: redirect to keycloak
    redirect("/auth/sign-in");
  }

  return children;
};
