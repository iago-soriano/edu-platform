// sign-in
export interface SignInRequestBody {
  email: string;
  password: string;
}
export interface SignInResponseBody {
  accessToken: string;
  refreshToken: string;
  user: { email: string; name?: string; image?: string };
}

export interface RefreshTokenRequestBody {
  refreshToken: string;
}
export interface RefreshTokenResponseBody {
  accessToken: string;
  refreshToken: string;
}

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
  image: string;
  provider: string;
  name: string;
}
export interface ProviderSignUpResponseBody {
  accessToken: string;
  refreshToken: string;
}

// sign-out
export interface SignOutRequestBody {
  refreshToken: string;
}
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
