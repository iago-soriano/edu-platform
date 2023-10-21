import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  // sign-in
  SignInHTTPDefinition,
  SignInRequestBody,
  SignInResponseBody,
  // sign-up
  SignUpHTTPDefinition,
  SignUpRequestBody,
  SignUpResponseBody,
  //sign-out
  SignOutHTTPDefinition,
  SignOutRequestBody,
  SignOutResponseBody,
  // provider sign-in
  ProviderSignInHTTPDefinition,
  ProviderSignInRequestBody,
  ProviderSignInResponseBody,
  // provider sign-up
  ProviderSignUpHTTPDefinition,
  ProviderSignUpRequestBody,
  ProviderSignUpResponseBody,
  // verify account
  VerifyAccountHTTPDefinition,
  VerifyAccountRequestBody,
  VerifyAccountResponseBody,
  // change password request
  ChangePasswordRequestHTTPDefinition,
  ChangePasswordRequestRequestBody,
  ChangePasswordRequestResponseBody,
  // change password
  ChangePasswordHTTPDefinition,
  ChangePasswordRequestBody,
  ChangePasswordResponseBody,
  // check change password token
  CheckChangePasswordTokenHTTPDefinition,
  CheckChangePasswordTokenRequestQueryParams,
  CheckChangePasswordTokenResponseBody,
} from "@edu-platform/common/api";
import { ServerError } from "@edu-platform/common";
import { axios } from "@infrastructure";

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
      axios.post.bind(axios)(ChangePasswordRequestHTTPDefinition.path, args),
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
      axios.put.bind(axios)(ChangePasswordHTTPDefinition.path, args),
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
      axios.post.bind(axios)(VerifyAccountHTTPDefinition.path, args),
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
