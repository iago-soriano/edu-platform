"use client";
import {
  Form,
  Button,
  ErrorAlert,
  errorToast,
  successToast,
  Input,
} from "@components";
import { PasswordInput } from "components/atoms/input/password-input";
import {
  useChangePasswordMutation,
  changePasswordSchema,
} from "@infrastructure";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const RequestNewPasswordLink = () => (
  <Link
    className="hover:opacity-70 inline-block py-3 px-1 underline"
    href="/auth/change-password-request"
  >
    Solicite uma nova troca de senha
  </Link>
);
const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("changePasswordToken");

  if (!token)
    return (
      <div className="my-auto mx-auto">
        <RequestNewPasswordLink />
      </div>
    );

  const { error, onSubmit, loading, isSuccess } = useChangePassword();

  if (error)
    return (
      <div className="my-auto">
        <ErrorAlert>{error}</ErrorAlert>
        <RequestNewPasswordLink />
      </div>
    );

  return (
    <>
      <h4 className="py-3 my-5 inline-block">Redefinir senha</h4>

      <Form onSubmit={onSubmit} schema={changePasswordSchema}>
        <Input hidden value={token || ""} readOnly name="token" />
        <PasswordInput
          key="0"
          className="w-full"
          autoComplete="new-password"
          name="password"
          inputLabel={{ text: "Senha", mandatory: true }}
          placeholder="Digite aqui sua senha"
        />
        <br />
        <PasswordInput
          key="1"
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
          isLoading={loading}
          disabled={isSuccess}
        >
          Enviar
        </Button>
      </Form>
    </>
  );
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
