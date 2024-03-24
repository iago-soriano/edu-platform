import { useSession } from "next-auth/react";
import { refreshToken } from "../api/auth";

export const useRefreshToken = () => {
  const session = useSession();
  return async () => await refreshToken(session);
};
