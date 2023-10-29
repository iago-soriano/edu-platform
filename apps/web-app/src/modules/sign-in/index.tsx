import {
  PasswordInput,
  Input,
  Form,
  Footer,
  FormButton,
  ErrorAlert,
  GoogleSignInButton,
  errorToast,
} from "@components";
import {
  signInSchema,
  useCredentialsSignInMutation,
  useGoogleSignInMutation,
} from "@infrastructure";
import Link from "next/link";

export const Page = () => {
  const { googleSignInMutation, credentialsSignInMutation, errorAlert } =
    useSignInPage();

  return (
    <div>
      <h2 className="text-txt">Entrar</h2>
      <GoogleSignInButton
        isLoading={googleSignInMutation.isLoading}
        onClick={googleSignInMutation.mutate}
      />
      {errorAlert}
      <Form onSubmit={credentialsSignInMutation.mutate} schema={signInSchema}>
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
        <Link
          className="hover:opacity-70 inline-block py-3 px-1 text-accent-1 underline mb-4 hover:text-accent-2"
          href="/auth/change-password-request"
        >
          Esqueceu sua senha?
        </Link>
        <FormButton
          label="Entrar"
          loading={credentialsSignInMutation.isLoading}
        />
      </Form>
      <Footer />
    </div>
  );
};

const useSignInPage = () => {
  const credentialsSignInMutation = useCredentialsSignInMutation();
  const googleSignInMutation = useGoogleSignInMutation();

  const getErrorAlert = () => {
    const error = googleSignInMutation.error || credentialsSignInMutation.error;
    return error && <ErrorAlert>{error?.message}</ErrorAlert>;
  };

  return {
    credentialsSignInMutation,
    googleSignInMutation,
    errorAlert: getErrorAlert(),
  };
};
