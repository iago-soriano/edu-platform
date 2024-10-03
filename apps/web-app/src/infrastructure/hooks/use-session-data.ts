import { useSession } from 'next-auth/react';

export const useSessionData = () => {
  const session = useSession();

  const isAuthenticated =
    session.status == 'authenticated' || session.status == 'loading';
  const user = session.data?.user;

  return { isAuthenticated, user };
};
