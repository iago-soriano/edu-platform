"use client";
import {
  PasswordInput,
  Input,
  Form,
  FormButton,
  ErrorAlert,
  GoogleSignInButton,
  errorToast,
} from "@components";
import {
  signUpSchema,
  useCredentialsSignUpMutation,
  useGoogleSignInMutation,
} from "@infrastructure";

export default () => {
  const { googleSignInMutation, credentialsSignUpMutation, errorAlert } =
    useSignUpPage();

  return (
    <>
      <h3 className="py-3 inline-block">Criar conta</h3>
      <GoogleSignInButton
        onClick={googleSignInMutation.mutate}
        isLoading={googleSignInMutation.isLoading}
      />
      {errorAlert}
      <Form onSubmit={credentialsSignUpMutation.mutate} schema={signUpSchema}>
        <Input
          name="name"
          inputLabel={{ text: "Nome", mandatory: true }}
          placeholder="Digite como gostaria de ser chamado"
          type="text"
        />
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
        <PasswordInput
          name="confirmPassword"
          inputLabel={{ text: "Confirmação de Senha", mandatory: true }}
          placeholder="Digite novamente sua senha"
        />
        <FormButton
          label="Criar conta"
          loading={credentialsSignUpMutation.isLoading}
        />
      </Form>
    </>
  );
};

const useSignUpPage = () => {
  const credentialsSignUpMutation = useCredentialsSignUpMutation();
  const googleSignInMutation = useGoogleSignInMutation();

  const getErrorAlert = () => {
    const error = googleSignInMutation.error || credentialsSignUpMutation.error;
    return error && <ErrorAlert>{error?.message}</ErrorAlert>;
  };

  return {
    credentialsSignUpMutation,
    googleSignInMutation,
    errorAlert: getErrorAlert(),
  };
};
