import { CustomError } from "../custom-error";
import { AuthRules } from "../../domain";

export class PasswordsDontMatchError extends CustomError {
  HTTPstatusCode = 400;
  static message = "Senha e confirmação de senha não são iguais";
  constructor() {
    super(PasswordsDontMatchError.message);
  }
}

export class HasProviderAccountError extends CustomError {
  HTTPstatusCode = 400;
  static message = (provider: string) =>
    `Utilize o botão \"Entrar com a conta do ${provider}\" para entrar`;
  constructor({ provider }: { provider: string }) {
    super(HasProviderAccountError.message(provider));
  }
}

export class HasAccountWithEmailAndPassword extends CustomError {
  HTTPstatusCode = 400;
  static message = "Account already created with e-mail and password";
  constructor() {
    super(HasAccountWithEmailAndPassword.message);
  }
}

export class InvalidPasswordError extends CustomError {
  HTTPstatusCode = 400;
  static message = `Senha inválida. ${AuthRules.PASSWORD_INSTRUCTION}`;
  constructor() {
    super(InvalidPasswordError.message);
  }
}

export class EmailAlreadySignedupError extends CustomError {
  HTTPstatusCode = 400;
  static message = "E-mail já está cadastrado";
  constructor() {
    super(EmailAlreadySignedupError.message);
  }
}

export class InvalidValidationTokenError extends CustomError {
  HTTPstatusCode = 403;
  static message = "Algo deu errado: Invalid token";
  constructor() {
    super(InvalidValidationTokenError.message);
  }
}

export class UserNotVerifiedError extends CustomError {
  HTTPstatusCode = 400;
  static message =
    "Favor verificar sua conta através do e-mail enviado antes de entrar";
  constructor() {
    super(UserNotVerifiedError.message);
  }
}

export class UserNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  static message = "Usuário não encontrado";
  constructor() {
    super(UserNotFoundError.message);
  }
}

export class CannotAlterUserError extends CustomError {
  HTTPstatusCode = 403;
  static message = "Usuário não pode ser editado";
  constructor() {
    super(CannotAlterUserError.message);
  }
}

export class InvalidCredentialsError extends CustomError {
  HTTPstatusCode = 400;
  static message = "E-mail ou senha inseridos não são válidos";
  constructor() {
    super(InvalidCredentialsError.message);
  }
}

export class CredentialsNotProvidedError extends CustomError {
  HTTPstatusCode = 400;
  static message = "Credenciais não fornecidas";
  constructor() {
    super(CredentialsNotProvidedError.message);
  }
}

export class InvalidNameError extends CustomError {
  HTTPstatusCode = 400;
  static message = "Nome inválido";
  constructor() {
    super(InvalidNameError.message);
  }
}

export class InvalidEmailError extends CustomError {
  HTTPstatusCode = 400;
  static message = "E-mail inválido";
  constructor() {
    super(InvalidEmailError.message);
  }
}

export class ChangePasswordRequestTokenExist extends CustomError {
  HTTPstatusCode = 400;
  static message =
    "Uma requisição para troca de senha já foi feita. Verifique sua caixa de e-mail.";
  constructor() {
    super(ChangePasswordRequestTokenExist.message);
  }
}
