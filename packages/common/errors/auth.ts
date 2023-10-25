import { CustomError } from "./custom-error";
import { AuthRules } from "@edu-platform/common/domain";

export class PasswordsDontMatchError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("Senha e confirmação de senha não são iguais");
  }
}

export class InvalidRoleError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("{ errorName: ErrorMessagesLabels.INVALID_ROLE }");
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
    super("Email já em uso");
  }
}

//   export class UserNotFoundError extends CustomError {
//     HTTPstatusCode = 404;
//     constructor() {
//       super({ errorName: ErrorMessagesLabels.USER_NOT_FOUND });
//     }
//   }

export class InvalidValidationTokenError extends CustomError {
  HTTPstatusCode = 403;
  constructor() {
    super("Token inválido");
  }
}

export class UserNotVerifiedError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ email }) {
    super("Usuário não verificado");
  }
}

export class InvalidCredentialsError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("Credenciais inválidas");
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
    super("Uma requisição para troca de senha já foi feita");
  }
}
