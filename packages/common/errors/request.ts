import { CustomError } from "./custom-error";

export class RouteNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super("{ errorName: ErrorMessagesLabels.ROUTE_NOT_FOUND }");
  }
}

export class CannotAlterUserError extends CustomError {
  HTTPstatusCode = 403;
  constructor() {
    super("{ errorName: ErrorMessagesLabels.CANNOT_ALTER_THIS_USER }");
  }
}

export class ParameterNotProvidedError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ parameter }) {
    super("");
  }
}

export class InvalidParameterError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("");
  }
}

export class UserNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super("{ errorName: ErrorMessagesLabels.USER_NOT_FOUND }");
  }
}

export class MissingTokenError extends CustomError {
  HTTPstatusCode = 403;
  constructor() {
    super("{ errorName: ErrorMessagesLabels.MISSING_TOKEN }");
  }
}

export class MalformedTokenError extends CustomError {
  HTTPstatusCode = 403;
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

export class Forbidden extends CustomError {
  HTTPstatusCode = 403;
  constructor() {
    super("{ errorName: ErrorMessagesLabels.INVALID_TOKEN }");
  }
}

export class ActivityStatusNotFound extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("Status não encontrado");
  }
}

export class ContentTypeNotFound extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("Tipo de conteúdo não encontrado");
  }
}

export class ActivityStatusNotFound extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("Tipo de conteúdo não encontrado");
  }
}
