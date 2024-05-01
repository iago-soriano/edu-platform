import * as yup from "yup";
import { AuthRules } from "@edu-platform/common/domain/auth/rules";

export const nameValidation = yup.string().required("Favor inserir um nome");

export const emailValidation = yup
  .string()
  .required("Favor inserir um e-mail")
  .email("Favor inserir um e-mail válido");

export const passwordValidation = yup
  .string()
  .required("Favor inserir uma senha")
  .matches(AuthRules.PASSWORD_REGEX, AuthRules.PASSWORD_INSTRUCTION);

export const confirmPasswordValidation = yup
  .string()
  .oneOf(
    [yup.ref("password"), ""],
    "Senha e confirmação de senha devem ser iguais"
  );

export const signInSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export const signUpSchema = yup.object().shape({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});

export const changePasswordRequestSchema = yup.object().shape({
  email: emailValidation,
});

export const changePasswordSchema = yup.object().shape({
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});
