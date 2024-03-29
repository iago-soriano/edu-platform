"use client";
import { useEffect } from "react";
import {
  Form,
  FormButton,
  ErrorAlert,
  errorToast,
  successToast,
  Input,
} from "@components";
import { PasswordInput } from "components/atoms/input/password-input";
import {
  useChangePasswordMutation,
  useCheckChangePasswordTokenMutation,
  changePasswordSchema,
} from "@infrastructure";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@components";
import Link from "next/link";

const Page = () => {
  const { token, isVerifying, isValid } = useVerifyToken();
  const { error, onSubmit, loading, isSuccess } = useChangePassword();

  console.log({ token, isVerifying, isValid });
  if (isVerifying && !isValid)
    return (
      <div className="w-52 h-52 max-w-[200px]">
        <Spinner />
      </div>
    );
  if (!isValid)
    return (
      <div id="invalid-token">
        <h4>O token não é válido</h4>
        <br />
        <Link
          className="hover:opacity-70 inline-block py-3 px-1 underline"
          href="auth/change-password-request"
        >
          Solicite uma nova troca de senha
        </Link>
      </div>
    );
  return (
    <>
      <h4 className="py-3 my-5 inline-block">Redefinir senha</h4>
      {error && (
        <>
          <ErrorAlert>{error}</ErrorAlert>
          <Link
            className="hover:opacity-70 inline-block py-3 px-1 underline"
            href="auth/change-password-request"
          >
            Solicite uma nova troca de senha
          </Link>
        </>
      )}
      <Form onSubmit={onSubmit} schema={changePasswordSchema}>
        <Input hidden value={token || ""} readOnly name="token" />
        <PasswordInput
          name="password"
          inputLabel={{ text: "Senha", mandatory: true }}
          placeholder="Digite aqui sua senha"
        />
        <br />

        <PasswordInput
          name="confirmPassword"
          inputLabel={{ text: "Confirmação de Senha", mandatory: true }}
          placeholder="Digite novamente sua senha"
        />
        <br />

        <FormButton label="Enviar" loading={loading} disabled={isSuccess} />
      </Form>
    </>
  );
};

const useVerifyToken = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("changePasswordToken");
  const mutation = useCheckChangePasswordTokenMutation();

  useEffect(() => {
    if (token) {
      mutation.mutate({ token });
    }
  }, [token]);

  console.log(mutation.isError, mutation.data);
  return {
    token: token,
    isVerifying: mutation.isPending || mutation.isIdle,
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
      router.push("auth/sign-in");
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
    loading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};

export default Page;
