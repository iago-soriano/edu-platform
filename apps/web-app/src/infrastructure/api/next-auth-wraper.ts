import { signIn } from 'next-auth/react';

export const nextAuthSignIn = async (provider, options = {}, args = {}) => {
  try {
    const resp = await signIn(provider, options, args);
    if (resp && (!resp.ok || resp.error)) {
      throw {
        status: resp.status,
        message: resp.error,
      };
    }
  } catch (e) {
    throw {
      status: 500,
      message: e.message as string,
    };
  }
};
