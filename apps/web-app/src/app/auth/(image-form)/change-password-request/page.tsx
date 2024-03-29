"use client";
import {
  Input,
  Form,
  FormButton,
  ErrorAlert,
  SuccessAlert,
  errorToast,
  successToast,
} from "@components";
import {
  useChangePasswordRequestMutation,
  changePasswordRequestSchema,
} from "@infrastructure";
import Link from "next/link";

const Page = () => {
  const mutation = useChangePasswordRequestMutation({
    onError: (args) => {
      errorToast("Houve um erro");
      console.error(args);
    },
    onSuccess: () =>
      successToast("E-mail de troca de senha enviado com sucesso"),
  });
  const hasError = () => mutation.error;
  const getError = () => {
    console.log(mutation.error?.message);
    if (mutation.error?.message === "USER_NOT_FOUND")
      return (
        <p>
          E-mail não encontrado. Já tem uma conta?{" "}
          <Link
            className="hover:opacity-70 inline-block py-3 px-1 underline"
            href="/auth/sign-up"
          >
            Criar conta
          </Link>
        </p>
      );
    return mutation.error?.message;
  };

  return (
    <>
      <h4 className="my-5">Trocar senha</h4>
      <p>
        Você receberá em seu e-mail um link para continuar com a troca de senha
      </p>
      {hasError() && <ErrorAlert>{getError()}</ErrorAlert>}

      {mutation.isSuccess && (
        <SuccessAlert>
          Confira seu e-mail para acessar o link de troca de senha
        </SuccessAlert>
      )}
      <br />

      <Form onSubmit={mutation.mutate} schema={changePasswordRequestSchema}>
        <Input
          name="email"
          inputLabel={{ text: "E-mail", mandatory: true }}
          placeholder="Digite aqui seu e-mail"
          type="email"
        />
        <br />

        <FormButton
          label="Enviar"
          loading={mutation.isPending}
          disabled={mutation.isSuccess}
        />
      </Form>
    </>
  );
};

export default Page;
