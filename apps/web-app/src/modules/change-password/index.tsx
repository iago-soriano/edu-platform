import { useEffect, useState } from "react";
import {
  PasswordInput,
  Form,
  Footer,
  FormButton,
  ErrorAlert,
  Heading,
  errorToast,
  successToast,
  Input,
} from "@components";
import {
  useChangePasswordMutation,
  useCheckChangePasswordTokenMutation,
  changePasswordSchema,
  useQueryParam,
} from "@infrastructure";
import { PageContainer, FormContainer } from "./styles";
import { useRouter } from "next/router";
import { Spinner } from "@components";

export const Page = () => {
  const { token, isVerifying, isValid } = useVerifyToken();
  const { error, onSubmit, loading, isSuccess } = useChangePassword();

  const renderContent = () => {
    if (isVerifying && !isValid)
      return (
        <div
          style={{
            width: "200",
            height: "200",
            maxWidth: "200",
          }}
        >
          <Spinner />
        </div>
      );
    if (!isValid)
      return (
        <div id="invalid-token">
          <h1>O token não é válido.</h1>
          <a href="/change-password-request">
            Solicite uma nova troca de senha
          </a>
        </div>
      );
    return (
      <FormContainer>
        <Heading>Redefinir senha</Heading>
        {error && (
          <>
            <ErrorAlert>{error}</ErrorAlert>
            <a href="/change-password-request">
              Solicite uma nova troca de senha
            </a>
          </>
        )}
        <Form onSubmit={onSubmit} schema={changePasswordSchema}>
          <Input hidden value={token} readOnly name="token" />
          <PasswordInput
            name="password"
            inputLabel={{ text: "Senha", mandatory: true }}
            placeholder="Digite aqui sua senha"
          />
          <PasswordInput
            name="confirmPassword"
            inputLabel={{ text: "Confirmação de Senha", mandatory: true }}
            placeholder="Digite novamente sua senha"
          />
          <FormButton label="Enviar" loading={loading} disabled={isSuccess} />
        </Form>
      </FormContainer>
    );
  };

  return (
    <PageContainer>
      {renderContent()}
      <Footer />
    </PageContainer>
  );
};

const useVerifyToken = () => {
  const router = useRouter();
  const token = useQueryParam("changePasswordToken", router);
  const mutation = useCheckChangePasswordTokenMutation();

  useEffect(() => {
    if (token && token.data) {
      mutation.mutate({ token: token.data });
    }
  }, [token?.data]);

  return {
    token: token?.data,
    isVerifying: mutation.isLoading || mutation.isIdle,
    isValid: mutation.isError || (mutation.isSuccess && mutation.data?.isValid), //if this endpoint is off, don't keep user from trying to change their password
  };
};

const useChangePassword = () => {
  const router = useRouter();

  const mutation = useChangePasswordMutation({
    onError: (error) => {
      errorToast("Houve um erro");
      console.error(error);
    },
    onSuccess: () => {
      successToast("Troca de senha realizada com sucesso");
      router.push("/sign-in");
    },
  });

  const onSubmit = async ({ token, password, confirmPassword }) => {
    mutation.mutate({
      changePasswordToken: token,
      newPassword: password,
      confirmNewPassword: confirmPassword,
    });
  };

  return {
    error: mutation.error?.message,
    onSubmit: onSubmit,
    loading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
  };
};
