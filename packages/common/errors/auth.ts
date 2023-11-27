import { CustomError } from "./custom-error";
import { AuthRules } from "../domain";

export class PasswordsDontMatchError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("Senha e confirmação de senha não são iguais");
  }
}

export class HasProviderAccountError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ provider }) {
    super(`Utilize o botão \"Entrar com a conta do ${provider}\" para entrar`);
  }
}

export class ActivityNotFound extends CustomError {
  HTTPstatusCode = 404;
  constructor({ realReason }) {
    super("Atividade não encontrada", realReason);
  }
}

export class InvalidPasswordError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(AuthRules.PASSWORD_INSTRUCTION);
  }
}

export class EmailAlreadySignedupError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("EMAIL_IN_USE");
  }
}

export class InvalidValidationTokenError extends CustomError {
  HTTPstatusCode = 403;
  constructor() {
    super("Algo deu errado: Invalid token");
  }
}

export class UserNotVerifiedError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ email }) {
    super(
      "Favor verificar sua conta através do e-mail enviado antes de entrar"
    );
  }
}

export class InvalidCredentialsError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("E-mail ou senha inseridos não são válidos");
  }
}

export class CredentialsNotProvidedError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("Credenciais não fornecidas");
  }
}

export class InvalidNameError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("Nome inválido");
  }
}

export class InvalidEmailError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("E-mail inválido");
  }
}

export class ChangePasswordRequestTokenExist extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      "Uma requisição para troca de senha já foi feita. Verifique sua caixa de e-mail."
    );
  }
}
