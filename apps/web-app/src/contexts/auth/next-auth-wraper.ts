import { ServerError } from "@edu-platform/common";
import {
    useSession,
    signOut,
    signIn
  } from "next-auth/react";

export const nextAuthSignIn = async (provider, options = {}, args = {}) => {
    try {
        const resp = await signIn(provider, options, args);
        if(resp && !resp.ok) {
            throw {
                status: resp.status,
                message: resp.error            
            }
        }
        return resp;
    } catch (e) {
        throw {
            status: 500,
            message: e.message as string
        } 
    }

}