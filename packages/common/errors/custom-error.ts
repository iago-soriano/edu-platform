import { FieldError } from "../api/interfaces";

export abstract class CustomError extends Error {
  abstract HTTPstatusCode?: number;
  constructor(
    public message: string = "",
    public fieldErrors: FieldError = {},
    public realReason: string | undefined = undefined
  ) {
    super(message);
  }
}

export class InvalidStateError extends CustomError {
  HTTPstatusCode = 400;
  constructor(
    message: string,
    opts?: { fieldErrors?: FieldError; fieldName?: string }
  ) {
    let fieldErrors = {};
    if (opts) {
      if (opts.fieldErrors) fieldErrors = opts.fieldErrors;
      else if (opts.fieldName) fieldErrors = { [opts.fieldName]: message };
      else if (opts.fieldErrors && opts.fieldName)
        throw new Error("Please provide either field error or field name");
    }
    super(message, fieldErrors);
  }
}

export class SilentInvalidStateError extends CustomError {
  HTTPstatusCode = 400;
  constructor(realReason: string) {
    super("", {}, realReason);
  }
}

export class Forbidden extends CustomError {
  HTTPstatusCode = 403;
  static message = (realReason?: string) => `${realReason}`;
  constructor(realReason?: string) {
    super(Forbidden.message(realReason));
  }
}
