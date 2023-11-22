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
import { useRouter } from "next/navigation";

const Page = () => {
  const { googleSignInMutation, credentialsSignInMutation } = useSignInPage();
  const hasError = () =>
    googleSignInMutation.error || credentialsSignInMutation.error;
  const getError = () =>
    googleSignInMutation.error.message ||
    credentialsSignInMutation.error.message;

  return (
    <>
      <h4 className="py-3 my-5 inline-block">Entrar</h4>
      <GoogleSignInButton
        isLoading={googleSignInMutation.isLoading}
        onClick={googleSignInMutation.mutate}
      />
      <Separator> Ou </Separator>
      {hasError() && <ErrorAlert>{getError()}</ErrorAlert>}
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
          className="hover:opacity-70 inline-block py-3 px-1 underline mb-4"
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
  const router = useRouter();

  const credentialsSignInMutation = useCredentialsSignInMutation({
    onError: (err) => {
      errorToast("Ocorreu um erro :(");
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
  const googleSignInMutation = useGoogleSignInMutation();

  return {
    credentialsSignInMutation,
    googleSignInMutation,
  };
};

export default Page;
