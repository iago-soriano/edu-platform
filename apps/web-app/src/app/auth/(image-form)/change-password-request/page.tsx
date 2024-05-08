"use client";
import {
  Input,
  Form,
  ErrorAlert,
  SuccessAlert,
  errorToast,
  successToast,
  Button,
} from "@components";
import {
  useChangePasswordRequestMutation,
  changePasswordRequestSchema,
} from "@infrastructure";

const Page = () => {
  const mutation = useChangePasswordRequestMutation({
    onError: (args) => {
      errorToast("Houve um erro");
      console.error(args);
    },
    onSuccess: () =>
      successToast("E-mail de troca de senha enviado com sucesso"),
  });

  return (
    <>
      <h4 className="my-5">Trocar senha</h4>
      <p>
        Você receberá em seu e-mail um link para continuar com a troca de senha
      </p>
      {mutation.error && <ErrorAlert>{mutation.error?.message}</ErrorAlert>}

      {mutation.isSuccess && (
        <SuccessAlert>
          Confira seu e-mail para acessar o link de troca de senha
        </SuccessAlert>
      )}
      <br />

      <Form onSubmit={mutation.mutate} schema={changePasswordRequestSchema}>
        <Input
          className="w-full"
          autoComplete="email"
          name="email"
          inputLabel={{ text: "E-mail", mandatory: true }}
          placeholder="Digite aqui seu e-mail"
          type="email"
        />
        <br />
        <Button
          type="submit"
          variant="action"
          size="full"
          isLoading={mutation.isPending}
          disabled={mutation.isSuccess}
        >
          Enviar
        </Button>
      </Form>
    </>
  );
};

export default Page;
