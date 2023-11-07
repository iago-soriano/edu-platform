"use client";
import { useEffect } from "react";
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

export const Page = () => {
  const { error, onSubmit, loading, isSuccess } = useRequest();

  return (
    <>
      <h1 className="my-20">Trocar senha</h1>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {isSuccess && (
        <SuccessAlert>
          Confira seu e-mail para acessar o link de troca de senha
        </SuccessAlert>
      )}
      <Form onSubmit={onSubmit} schema={changePasswordRequestSchema}>
        <Input
          name="email"
          inputLabel={{ text: "E-mail", mandatory: true }}
          placeholder="Digite aqui seu e-mail"
          type="email"
        />
        <FormButton label="Enviar" loading={loading} disabled={isSuccess} />
      </Form>
    </>
  );
};

const useRequest = () => {
  const mutation = useChangePasswordRequestMutation({
    onError: (args) => console.error(args),
    onSuccess: () =>
      successToast("E-mail de troca de senha enviado com sucesso"),
  });

  const onSubmit = async ({ email }) => {
    mutation.mutate({ email });
  };

  useEffect(() => {
    if (mutation.error) {
      errorToast("Houve um erro");
    }
  }, [mutation]);

  return {
    error: mutation.error?.message,
    onSubmit: onSubmit,
    loading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
  };
};
