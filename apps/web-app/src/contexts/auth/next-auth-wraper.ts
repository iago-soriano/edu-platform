import {
    useSession,
    signOut,
    signIn
  } from "next-auth/react";

export const nextAuthSignIn = async (provider, options = {}, args = {}) => {
    const resp = await signIn(provider, options, args);
    if(!resp.ok) {
        throw {
            status: resp.status,
            message: resp.error            
        }
    }
    return resp;
}