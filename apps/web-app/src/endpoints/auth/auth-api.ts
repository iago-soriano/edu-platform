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
import { ServerError } from "@edu-platform/common/api";
import { AxiosFetcher } from "../../infrastructure/api/axios-fetcher";
import { nextAuthSignIn } from "../../infrastructure/api/next-auth-wraper";
import {
  ErrorCallback,
  MutationArgsType,
  MutationArgsDefaultValue,
} from "../../infrastructure/api/types";
// import { axios } from "../infrastructure/api/axios-instance";
// TODO: refactor to use the types above in all calls

export const axios = new AxiosFetcher(process.env.NEXT_PUBLIC_API_HOST!);

export const useChangePasswordRequestMutation = ({
  onError,
  onSuccess,
}: MutationArgsType<
  ChangePasswordRequestRequestBody,
  CheckChangePasswordTokenResponseBody
> = MutationArgsDefaultValue) =>
  useMutation<
    ChangePasswordRequestResponseBody,
    ServerError,
    ChangePasswordRequestRequestBody
  >({
    mutationFn: (args: ChangePasswordRequestRequestBody) =>
      axios.post.bind(axios)("iam/change-password-request", args),
    onError,
    // onSuccess,
  });

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
  >({
    mutationFn: (args: ChangePasswordRequestBody) =>
      axios.put.bind(axios)("iam/change-password", args),
    onError,
    onSuccess,
  });

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
    {
      mutationFn: (args: VerifyAccountResponseBody) =>
        axios.patch.bind(axios)("iam/verify-account", args),
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
  >({
    mutationFn: (args: CheckChangePasswordTokenRequestQueryParams) =>
      axios.get.bind(axios)(
        `iam/check-token-validity?token=${args.token}`,
        args
      ),
    onError,
    onSuccess,
  });

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
  useMutation<void, ServerError, SignInRequestBody>({
    mutationFn: ({ email, password }: SignInRequestBody) =>
      nextAuthSignIn("credentials", { redirect: false }, { email, password }),
    onError,
    onSuccess,
  });

// export const useSignOutMutation = (
//   {
//     onError,
//     onSuccess,
//   }: Partial<{
//     onError: ErrorCallback<SignOutRequestBody>;
//     onSuccess: () => unknown;
//   }> = {
//     onError: () => {},
//     onSuccess: () => {},
//   }
// ) =>
//   useMutation<SignOutResponseBody, ServerError, SignOutRequestBody>({
//     mutationFn: (args: SignOutRequestBody) =>
//       axios.post.bind(axios)("sign-out", args),
//     onError,
//     onSuccess,
//   });

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
  useMutation<void, ServerError, void>({
    mutationFn: () => nextAuthSignIn("google", { redirect: false }),
    onError,
    onSuccess,
  });

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
  useMutation<void, ServerError, SignUpRequestBody>({
    mutationFn: (args: SignUpRequestBody) =>
      axios.post.bind(axios)("iam/sign-up", args),
    onError,
    onSuccess,
  });
