import { CustomError } from "./custom-error";

export class MissingTokenError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("{ errorName: ErrorMessagesLabels.MISSING_TOKEN }");
  }
}

export class MalformedTokenError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("{ errorName: ErrorMessagesLabels.MALFORMED_TOKEN }");
  }
}

export class CouldNotVerifyTokenError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("{ errorName: ErrorMessagesLabels.COULD_NOT_VERIFY_TOKEN }");
  }
}

export class InsufficientTokenError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("{ errorName: ErrorMessagesLabels.COULD_NOT_VERIFY_TOKEN }");
  }
}

export class Unauthorized extends CustomError {
  HTTPstatusCode = 401;
  constructor() {
    super("Token de acesso inválido");
  }
}

export class Forbidden extends CustomError {
  HTTPstatusCode = 403;
  constructor() {
    super("Forbidden");
  }
}
