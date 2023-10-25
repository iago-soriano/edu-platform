import { useAuth } from "@contexts";
import {
  PasswordInput,
  Input,
  Form,
  Footer,
  FormButton,
  ErrorAlert,
  GoogleSignInButton,
  errorToast,
} from "@components";
import { signInSchema } from "@infrastructure";
import { useEffect } from "react";
import Link from "next/link";

export const Page = () => {
  const { googleSignIn } = useAuth();

  const { credentialError, credentialOnSubmit, credentialLoading } =
    useCredentialSignIn();

  return (
    <>
      <h2>Entrar</h2>
      <GoogleSignInButton onClick={googleSignIn.mutate} />
      {credentialError && <ErrorAlert>{credentialError}</ErrorAlert>}
      <Form onSubmit={credentialOnSubmit} schema={signInSchema}>
        <Input
          name="email"
          inputLabel={{ text: "E-mail", mandatory: true }}
          placeholder="Digite aqui seu e-mail"
          type="email"
        />
        <PasswordInput
          name="password"
          inputLabel={{ text: "Senha", mandatory: true }}
          placeholder="Digite aqui sua senha"
        />
        <Link
          className="inline-block py-3 px-1 text-accent-1 underline mb-4 hover:text-accent-2"
          href="/auth/change-password-request"
        >
          Esqueceu sua senha?
        </Link>
        <FormButton label="Entrar" loading={credentialLoading} />
      </Form>
      <Footer />
    </>
  );
};

const useCredentialSignIn = () => {
  const { credentialsSignIn } = useAuth();
  const onSubmit = async ({ email, password }) => {
    try {
      credentialsSignIn.mutate({ email, password });
    } catch (e) {
      console.error({ e });
    }
  };

  useEffect(() => {
    if (credentialsSignIn.error) {
      errorToast("Houve um erro");
    }
  }, [credentialsSignIn]);

  return {
    credentialError: credentialsSignIn.error?.message,
    credentialOnSubmit: onSubmit,
    credentialLoading: credentialsSignIn.isLoading,
  };
};
