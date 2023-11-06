import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageStyled } from "./styles";
import {
  useVerifyAccountMutation,
  LocalStorageHelper,
  useQueryParam,
} from "@infrastructure";
import { ServerError } from "@edu-platform/common";
import { Spinner } from "@components";

export const Page = () => {
  const { loading, error, verified } = useVerifyAccount();
  //   const router = useRouter();

  const renderPage = () => {
    if (loading)
      return (
        <div id="spinner">
          <Spinner />
        </div>
      );
    if (error)
      return (
        <p>Um erro ocorreu. Envie um e-mail para edu-platform@gmail.com</p>
      );
    if (!verified)
      return (
        <>
          <h1>
            Um e-mail de verificação de conta foi enviado para o seu e-mail.
          </h1>
          <h3>Clique no botão enviado no e-mail para entrar.</h3>
        </>
      );
    if (verified)
      return (
        <>
          <h1>Bem-vindo(a)!</h1>
          <a href="/sign-in">Entrar</a>
        </>
      );
  };

  return <PageStyled>{renderPage()}</PageStyled>;
};

const useVerifyAccount = () => {
  const router = useRouter();
  const localStorage = new LocalStorageHelper();

  const [verifyState, setVerifyState] = useState({
    loading: true,
    error: null,
    verified: false,
  });

  const verificationToken = useQueryParam("verificationToken", router);

  const mutation = useVerifyAccountMutation({
    onSuccess: () => {
      localStorage.setVerifiedToken(verificationToken.data);
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
    if (verificationToken) {
      // user is entering this page after having already verified their account
      if (localStorage.hasToken(verificationToken.data)) {
        setVerifyState({
          loading: false,
          error: null,
          verified: true,
        });
        return;
      }

      // user has not yet verified their account, and is coming from the sign-up page
      if (!verificationToken.data) {
        setVerifyState({
          loading: false,
          error: null,
          verified: false,
        });
        // user has token in browser url
      } else {
        mutation.mutate({ verifyAccountToken: verificationToken.data });
      }
    }
  }, [verificationToken?.data]);

  return verifyState;
};
