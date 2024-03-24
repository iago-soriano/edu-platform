import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AxiosFetcher } from "../api/axios-fetcher";

export const useSignOut = () => {
  const router = useRouter();
  const session = useSession();
  const axios = new AxiosFetcher(process.env.NEXT_PUBLIC_API_HOST!);

  const doSignOut = () => {
    signOut({
      redirect: false,
      callbackUrl: "/",
    });
    router.replace("/");
    if (session?.data)
      axios.post.bind(axios)("sign-out", {
        refreshToken: session.data.user.refreshToken,
      });
  };

  return doSignOut;
};
