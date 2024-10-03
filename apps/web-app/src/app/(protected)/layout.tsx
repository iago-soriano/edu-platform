import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async ({ children }) => {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/auth/sign-in');
  }

  return children;
};
