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
} from "./contracts";
import { IHTTPClient } from "@edu-platform/common";

export interface IApiClient {
  SignIn: (args: SignInRequestBody) => Promise<SignInResponseBody>;
  SignUp: (args: SignUpRequestBody) => Promise<SignUpResponseBody>;
  SignOut: (args: SignOutRequestBody) => Promise<SignOutResponseBody>;
  ProviderSignUp: (
    args: ProviderSignUpRequestBody
  ) => Promise<ProviderSignUpResponseBody>;
  ProviderSignIn: (
    args: ProviderSignInRequestBody
  ) => Promise<ProviderSignInResponseBody>;
}

export class ApiClient implements IApiClient {
  constructor(private _httpClient: IHTTPClient) {}

  SignIn(args: SignInRequestBody) {
    return this._httpClient.post(
      SignInHTTPDefinition.path,
      args
    ) as Promise<SignInResponseBody>;
  }

  SignUp(args: SignUpRequestBody) {
    return this._httpClient.post(
      SignUpHTTPDefinition.path,
      args
    ) as Promise<SignUpResponseBody>;
  }

  SignOut() {
    return this._httpClient.post(
      SignOutHTTPDefinition.path,
      {}
    ) as Promise<SignOutResponseBody>;
  }

  ProviderSignIn(args: ProviderSignInRequestBody) {
    return this._httpClient.post(
      ProviderSignInHTTPDefinition.path,
      args
    ) as Promise<ProviderSignInResponseBody>;
  }

  ProviderSignUp(args: ProviderSignUpRequestBody) {
    return this._httpClient.post(
      ProviderSignUpHTTPDefinition.path,
      args
    ) as Promise<ProviderSignUpResponseBody>;
  }

  VerifyAccount(args: VerifyAccountRequestBody) {
    return this._httpClient.patch(
      VerifyAccountHTTPDefinition.path,
      args
    ) as Promise<VerifyAccountResponseBody>;
  }

  ChangePasswordRequest(args: ChangePasswordRequestRequestBody) {
    console.log({ this: this });
    return this._httpClient.post(
      ChangePasswordRequestHTTPDefinition.path,
      args
    ) as Promise<ChangePasswordRequestResponseBody>;
  }

  ChangePassword(args: ChangePasswordRequestBody) {
    return this._httpClient.put(
      ChangePasswordHTTPDefinition.path,
      args
    ) as Promise<ChangePasswordResponseBody>;
  }
}
