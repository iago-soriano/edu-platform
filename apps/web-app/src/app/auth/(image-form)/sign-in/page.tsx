"use client";
import {
  PasswordInput,
  Input,
  Form,
  Footer,
  FormButton,
  ErrorAlert,
  GoogleSignInButton,
  errorToast,
  Separator,
} from "@components";
import {
  signInSchema,
  useCredentialsSignInMutation,
  useGoogleSignInMutation,
} from "@infrastructure";
import Link from "next/link";

const Page = () => {
  const { googleSignInMutation, credentialsSignInMutation, errorAlert } =
    useSignInPage();

  return (
    <>
      <h3 className="py-3 my-5 inline-block">Entrar</h3>
      <GoogleSignInButton
        isLoading={googleSignInMutation.isLoading}
        onClick={googleSignInMutation.mutate}
      />
      <Separator> Ou </Separator>
      {errorAlert}
      <br />
      <Form onSubmit={credentialsSignInMutation.mutate} schema={signInSchema}>
        <Input
          name="email"
          inputLabel={{ text: "E-mail", mandatory: true }}
          placeholder="Digite aqui seu e-mail"
          type="email"
        />
        <br />
        <PasswordInput
          name="password"
          inputLabel={{ text: "Senha", mandatory: true }}
          placeholder="Digite aqui sua senha"
        />
        <br />
        <Link
          className="hover:opacity-70 inline-block py-3 px-1 text-accent-1 underline mb-4 hover:text-accent-2"
          href="/auth/change-password-request"
        >
          Esqueceu sua senha?
        </Link>
        <br />
        <FormButton
          label="Entrar"
          loading={credentialsSignInMutation.isLoading}
        />
      </Form>
    </>
  );
};

const useSignInPage = () => {
  const credentialsSignInMutation = useCredentialsSignInMutation();
  const googleSignInMutation = useGoogleSignInMutation();

  const getErrorAlert = () => {
    const error = googleSignInMutation.error || credentialsSignInMutation.error;
    return error && <ErrorAlert>{error?.message}</ErrorAlert>;
  };

  return {
    credentialsSignInMutation,
    googleSignInMutation,
    errorAlert: getErrorAlert(),
  };
};

export default Page;
