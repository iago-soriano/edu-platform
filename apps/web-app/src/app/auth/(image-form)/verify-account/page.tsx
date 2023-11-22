"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useVerifyAccountMutation, LocalStorageHelper } from "@infrastructure";
import { ServerError } from "@edu-platform/common";
import { Spinner } from "@components";

const Page = () => {
  const { loading, error, verified } = useVerifyAccount();

  if (loading)
    return (
      <div className="w-52 h-52 max-w-[200px]">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <p className="">
        Um erro ocorreu. Envie um e-mail para iago.srm.is@gmail.com
      </p>
    );
  if (!verified)
    return (
      <>
        <h4 className="">
          Um e-mail de verificação de conta foi enviado para o seu e-mail.
        </h4>
        <br />
        <br />
        <p className="text-text2 opacity-80">
          Clique no botão enviado no e-mail para entrar.
        </p>
      </>
    );
  if (verified)
    return (
      <>
        <h4>Bem-vindo(a)!</h4>
        <br />
        <Link
          className="hover:opacity-70 inline-block py-3 px-1 underline"
          href="/auth/sign-in"
        >
          Entrar
        </Link>
      </>
    );
};

const useVerifyAccount = () => {
  const localStorage = new LocalStorageHelper();

  const [verifyState, setVerifyState] = useState({
    loading: true,
    error: null,
    verified: false,
  });

  const searchParams = useSearchParams();
  const verificationToken = searchParams.get("verificationToken");

  const mutation = useVerifyAccountMutation({
    onSuccess: () => {
      localStorage.setVerifiedToken(verificationToken);
      setVerifyState({
        loading: false,
        error: null,
        verified: true,
      });
    },
    onError: (e: ServerError) => {
      setVerifyState({
        loading: false,
        error: e.message,
        verified: false,
      });
    },
  });

  useEffect(() => {
    if (verificationToken && localStorage.hasToken(verificationToken)) {
      // user is entering this page after having already verified their account
      setVerifyState({
        loading: false,
        error: null,
        verified: true,
      });
      return;
    }

    // user has not yet verified their account, and is coming from the sign-up page
    else if (!verificationToken) {
      setVerifyState({
        loading: false,
        error: null,
        verified: false,
      });
    }

    // user has token in browser url
    else {
      mutation.mutate({ verifyAccountToken: verificationToken });
    }
  }, [verificationToken]);

  return verifyState;
};

export default Page;
