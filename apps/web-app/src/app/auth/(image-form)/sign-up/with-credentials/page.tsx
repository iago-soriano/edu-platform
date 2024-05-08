"use client";
import {
  Input,
  Form,
  ErrorAlert,
  errorToast,
  successToast,
  Button,
} from "@components";
import { PasswordInput } from "components/atoms/input/password-input";
import { signUpSchema, useCredentialsSignUpMutation } from "@infrastructure";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const { credentialsSignUpMutation } = useSignUpPage();

  const hasError = () => credentialsSignUpMutation.error;
  const getError = () => {
    // console.log(credentialsSignUpMutation.error.message);
    if (credentialsSignUpMutation.error?.message === "EMAIL_IN_USE")
      return (
        <p>
          Este e-mail já está sendo utilizado.{" "}
          <Link
            className="hover:opacity-70 inline-block py-3 px-1 underline"
            href="/auth/change-password-request"
          >
            Esqueceu sua senha?
          </Link>
        </p>
      );
    return credentialsSignUpMutation.error?.message;
  };

  return (
    <div>
      <h4 className="py-3 my-5 inline-block">Criar conta</h4>
      {hasError() && <ErrorAlert>{getError()}</ErrorAlert>}
      <br />
      <Form onSubmit={credentialsSignUpMutation.mutate} schema={signUpSchema}>
        <Input
          className="w-full"
          autoComplete="name"
          name="name"
          inputLabel={{ text: "Nome", mandatory: true }}
          placeholder="Digite como gostaria de ser chamado"
          type="text"
        />
        <br />
        <Input
          className="w-full"
          autoComplete="email"
          name="email"
          inputLabel={{ text: "E-mail", mandatory: true }}
          placeholder="Digite aqui seu e-mail"
          type="email"
        />
        <br />
        <PasswordInput
          className="w-full"
          key="3"
          autoComplete="new-password"
          name="password"
          inputLabel={{ text: "Senha", mandatory: true }}
          placeholder="Digite aqui sua senha"
        />
        <br />
        <PasswordInput
          key="4"
          className="w-full"
          autoComplete="new-password"
          name="confirmPassword"
          inputLabel={{ text: "Confirmação de Senha", mandatory: true }}
          placeholder="Digite novamente sua senha"
        />
        <br />
        <Button
          type="submit"
          variant="action"
          size="full"
          isLoading={credentialsSignUpMutation.isPending}
        >
          Criar conta
        </Button>
      </Form>
    </div>
  );
};

const useSignUpPage = () => {
  const router = useRouter();

  const credentialsSignUpMutation = useCredentialsSignUpMutation({
    onError: () => {
      errorToast("Houve um erro");
    },
    onSuccess: () => {
      successToast("Conta criada com sucesso!");
      router.push("/auth/verify-account");
    },
  });

  return {
    credentialsSignUpMutation,
  };
};

export default Page;
