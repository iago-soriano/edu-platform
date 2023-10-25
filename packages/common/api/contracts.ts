import { HTTPControllerDefinition } from "./interfaces";

// sign-in
export interface SignInRequestBody {
  email: string;
  password: string;
}
export interface SignInResponseBody {
  token: string;
  user: { email: string; name?: string; image?: string };
}
export const SignInHTTPDefinition: HTTPControllerDefinition = {
  method: "post",
  path: "sign-in",
};

export type ProviderSignInRequestBody = { email: string; provider: string };
export type ProviderSignInResponseBody = {
  token: string;
  user: { email: string; name?: string; image?: string };
};
export const ProviderSignInHTTPDefinition: HTTPControllerDefinition = {
  method: "post",
  path: "sign-in/provider",
};

// sign-up
export interface SignUpRequestBody {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}
export interface SignUpResponseBody {}
export const SignUpHTTPDefinition: HTTPControllerDefinition = {
  method: "post",
  path: "sign-up",
};

export interface ProviderSignUpRequestBody {
  email: string;
  id: string;
  image: string;
  provider: string;
  name: string;
}
export interface ProviderSignUpResponseBody {}
export const ProviderSignUpHTTPDefinition: HTTPControllerDefinition = {
  method: "post",
  path: "sign-up/provider",
};

// sign-out
export interface SignOutRequestBody {}
export interface SignOutResponseBody {}
export const SignOutHTTPDefinition: HTTPControllerDefinition = {
  method: "post",
  path: "sign-out",
};

// verify account
export interface VerifyAccountRequestBody {
  verifyAccountToken: string;
}
export interface VerifyAccountResponseBody {}
export const VerifyAccountHTTPDefinition: HTTPControllerDefinition = {
  method: "patch",
  path: "verify-account",
};

// change password request
export interface ChangePasswordRequestRequestBody {
  email: string;
}
export interface ChangePasswordRequestResponseBody {}
export const ChangePasswordRequestHTTPDefinition: HTTPControllerDefinition = {
  method: "post",
  path: "change-password-request",
};

// change password
export interface ChangePasswordRequestBody {
  changePasswordToken: string;
  newPassword: string;
  confirmNewPassword: string;
}
export interface ChangePasswordResponseBody {}
export const ChangePasswordHTTPDefinition: HTTPControllerDefinition = {
  method: "put",
  path: "change-password",
};

// check change password token
export type CheckChangePasswordTokenRequestQueryParams = {
  token: string;
};
export interface CheckChangePasswordTokenResponseBody {
  isValid: boolean;
}
export const CheckChangePasswordTokenHTTPDefinition: HTTPControllerDefinition =
  {
    method: "get",
    path: "check-token-validity",
  };
