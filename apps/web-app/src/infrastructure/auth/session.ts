import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession as nextAuthGetServerSession } from "next-auth";
import { getSession as nextAuthGetSession } from 'next-auth/react';

export const getServerSession = () => nextAuthGetServerSession(authOptions);
export const getSession = () => nextAuthGetSession({ });