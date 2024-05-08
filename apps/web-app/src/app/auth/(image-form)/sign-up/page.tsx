"use client";
import {
  ErrorAlert,
  GoogleSignInButton,
  Separator,
  CredentialsSignInButton,
} from "@components";
import {
  signUpSchema,
  useCredentialsSignUpMutation,
  useGoogleSignInMutation,
} from "@infrastructure";
import { useRouter } from "next/navigation";

const Page = () => {
  const { googleSignInMutation } = useSignUpPage();
  const router = useRouter();

  return (
    <div>
      <h4 className="py-3 my-5 inline-block">Criar conta</h4>
      <br />
      <br />

      <GoogleSignInButton
        onClick={googleSignInMutation.mutate}
        isLoading={googleSignInMutation.isPending}
      />
      <Separator> Ou </Separator>
      <CredentialsSignInButton
        onClick={() => router.push("/auth/sign-up/with-credentials")}
      />
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
