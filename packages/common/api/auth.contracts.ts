// sign-in
export interface SignInRequestBody {
  email: string;
  password: string;
}
export interface SignInResponseBody {
  token: string;
  user: { email: string; name?: string; image?: string };
}

export type ProviderSignInRequestBody = { email: string; provider: string };
export type ProviderSignInResponseBody = {
  token: string;
  user: { email: string; name?: string; image?: string };
};

// sign-up
export interface SignUpRequestBody {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}
export interface SignUpResponseBody {}

export interface ProviderSignUpRequestBody {
  email: string;
  id: string;
  image: string;
  provider: string;
  name: string;
}
export interface ProviderSignUpResponseBody {}

// sign-out
export interface SignOutRequestBody {}
export interface SignOutResponseBody {}

// verify account
export interface VerifyAccountRequestBody {
  verifyAccountToken: string;
}
export interface VerifyAccountResponseBody {}

// change password request
export interface ChangePasswordRequestRequestBody {
  email: string;
}
export interface ChangePasswordRequestResponseBody {}

// change password
export interface ChangePasswordRequestBody {
  changePasswordToken: string;
  newPassword: string;
  confirmNewPassword: string;
}
export interface ChangePasswordResponseBody {}

// check change password token
export type CheckChangePasswordTokenRequestQueryParams = {
  token: string;
};
export interface CheckChangePasswordTokenResponseBody {
  isValid: boolean;
}
