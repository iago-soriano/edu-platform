import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async ({ children }) => {
  const session = await getServerSession();
  // console.log({ session });
  if (!session || !session.user) {
    console.log(session);
    redirect("auth/sign-in");
  }

  return children;
};
