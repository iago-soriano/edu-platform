import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  // sign-in
  SignInRequestBody,
  SignInResponseBody,
  // sign-up
  SignUpRequestBody,
  SignUpResponseBody,
  //sign-out
  SignOutRequestBody,
  SignOutResponseBody,
  // provider sign-in
  ProviderSignInRequestBody,
  ProviderSignInResponseBody,
  // provider sign-up
  ProviderSignUpRequestBody,
  ProviderSignUpResponseBody,
  // verify account
  VerifyAccountRequestBody,
  VerifyAccountResponseBody,
  // change password request
  ChangePasswordRequestRequestBody,
  ChangePasswordRequestResponseBody,
  // change password
  ChangePasswordRequestBody,
  ChangePasswordResponseBody,
  // check change password token
  CheckChangePasswordTokenRequestQueryParams,
  CheckChangePasswordTokenResponseBody,
} from "@edu-platform/common/api";
import { ServerError } from "@edu-platform/common";
import { axios } from "@infrastructure";
import { nextAuthSignIn } from "./next-auth-wraper";

type ErrorCallback<V> = (
  e: ServerError,
  variables: V,
  context: unknown
) => unknown;

export const useChangePasswordRequestMutation = (
  {
    onError,
    onSuccess,
  }: Partial<{
    onError: ErrorCallback<ChangePasswordRequestRequestBody>;
    onSuccess: () => unknown;
  }> = {
    onError: () => {},
    onSuccess: () => {},
  }
) =>
  useMutation<
    ChangePasswordRequestResponseBody,
    ServerError,
    ChangePasswordRequestRequestBody
  >(
    (args: ChangePasswordRequestRequestBody) =>
      axios.post.bind(axios)("change-password-request", args),
    {
      onError,
      onSuccess,
    }
  );

export const useChangePasswordMutation = (
  {
    onError,
    onSuccess,
  }: Partial<{
    onError: ErrorCallback<ChangePasswordRequestBody>;
    onSuccess: () => unknown;
  }> = {
    onError: () => {},
    onSuccess: () => {},
  }
) =>
  useMutation<
    ChangePasswordResponseBody,
    ServerError,
    ChangePasswordRequestBody
  >(
    (args: ChangePasswordRequestBody) =>
      axios.put.bind(axios)("change-password", args),
    {
      onError,
      onSuccess,
    }
  );

export const useVerifyAccountMutation = (
  {
    onError,
    onSuccess,
  }: Partial<{
    onError: ErrorCallback<VerifyAccountRequestBody>;
    onSuccess: () => unknown;
  }> = {
    onError: () => {},
    onSuccess: () => {},
  }
) =>
  useMutation<VerifyAccountResponseBody, ServerError, VerifyAccountRequestBody>(
    (args: VerifyAccountResponseBody) =>
      axios.patch.bind(axios)("verify-account", args),
    {
      onError,
      onSuccess,
    }
  );

export const useCheckChangePasswordTokenMutation = (
  {
    onError,
    onSuccess,
  }: Partial<{
    onError: ErrorCallback<CheckChangePasswordTokenRequestQueryParams>;
    onSuccess: () => unknown;
  }> = {
    onError: () => {},
    onSuccess: () => {},
  }
) =>
  useMutation<
    CheckChangePasswordTokenResponseBody,
    ServerError,
    CheckChangePasswordTokenRequestQueryParams
  >(
    (args: CheckChangePasswordTokenRequestQueryParams) =>
      // axios.get.bind(axios)(
      //   `${CheckChangePasswordTokenHTTPDefinition.path}?token=${args.token}`,
      //   args
      // ),
      new Promise((resolve) =>
        setTimeout(() => resolve({ isValid: true }), 1000)
      ),
    {
      onError,
      onSuccess,
    }
  );

export const useCredentialsSignInMutation = (
  {
    onError,
    onSuccess,
  }: Partial<{
    onError: ErrorCallback<SignInRequestBody>;
    onSuccess: () => unknown;
  }> = {
    onError: () => {},
    onSuccess: () => {},
  }
) =>
  useMutation<void, ServerError, SignInRequestBody>(
    ({ email, password }: SignInRequestBody) =>
      nextAuthSignIn("credentials", { redirect: false }, { email, password }),
    {
      onError,
      onSuccess,
    }
  );

export const useSignOutMutation = (
  {
    onError,
    onSuccess,
  }: Partial<{
    onError: ErrorCallback<SignOutRequestBody>;
    onSuccess: () => unknown;
  }> = {
    onError: () => {},
    onSuccess: () => {},
  }
) =>
  useMutation<SignOutResponseBody, ServerError, SignOutRequestBody>(
    () => axios.post.bind(axios)("sign-out"),
    {
      onError,
      onSuccess,
    }
  );

export const useGoogleSignInMutation = (
  {
    onError,
    onSuccess,
  }: Partial<{
    onError: ErrorCallback<void>;
    onSuccess: () => unknown;
  }> = {
    onError: () => {},
    onSuccess: () => {},
  }
) =>
  useMutation<void, ServerError, void>(
    () => nextAuthSignIn("google", { redirect: false }),
    {
      onError,
      onSuccess,
    }
  );

export const useCredentialsSignUpMutation = (
  {
    onError,
    onSuccess,
  }: Partial<{
    onError: ErrorCallback<SignUpRequestBody>;
    onSuccess: () => unknown;
  }> = {
    onError: () => {},
    onSuccess: () => {},
  }
) =>
  useMutation<void, ServerError, SignUpRequestBody>(
    (args: SignUpRequestBody) => axios.post.bind(axios)("sign-out", args),
    {
      onError,
      onSuccess,
    }
  );
