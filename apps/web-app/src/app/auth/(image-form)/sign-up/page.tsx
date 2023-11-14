"use client";
import {
  PasswordInput,
  Input,
  Form,
  FormButton,
  ErrorAlert,
  GoogleSignInButton,
  Separator,
} from "@components";
import {
  signUpSchema,
  useCredentialsSignUpMutation,
  useGoogleSignInMutation,
} from "@infrastructure";

const Page = () => {
  const { googleSignInMutation, credentialsSignUpMutation, errorAlert } =
    useSignUpPage();

  return (
    <div>
      <h3 className="py-3 my-5 inline-block">Criar conta</h3>
      <GoogleSignInButton
        onClick={googleSignInMutation.mutate}
        isLoading={googleSignInMutation.isLoading}
      />
      <Separator> Ou </Separator>
      {errorAlert}
      <br />
      <Form onSubmit={credentialsSignUpMutation.mutate} schema={signUpSchema}>
        <Input
          name="name"
          inputLabel={{ text: "Nome", mandatory: true }}
          placeholder="Digite como gostaria de ser chamado"
          type="text"
        />
        <br />
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
        <PasswordInput
          name="confirmPassword"
          inputLabel={{ text: "Confirmação de Senha", mandatory: true }}
          placeholder="Digite novamente sua senha"
        />
        <br />
        <FormButton
          label="Criar conta"
          loading={credentialsSignUpMutation.isLoading}
        />
      </Form>
    </div>
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

export default Page;
