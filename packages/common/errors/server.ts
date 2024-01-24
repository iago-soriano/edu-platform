import { CustomError } from "./custom-error";

export class TokenGenerationError extends CustomError {
  HTTPstatusCode = 400;
  static message = (error: string) => `${error}`;
  constructor({ error }: { error: string }) {
    super(TokenGenerationError.message(error));
  }
}

export class RouteNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  static message = "Rota não encontrada";
  constructor() {
    super(RouteNotFoundError.message);
  }
}

export class EncryptingError extends CustomError {
  HTTPstatusCode = 404;
  static message = "Error trying to encrypt password";
  constructor() {
    super(EncryptingError.message);
  }
}

export class IdMustBeNumber extends CustomError {
  HTTPstatusCode = 404;
  static message = "Ids must be numbers";
  constructor() {
    super(IdMustBeNumber.message);
  }
}
