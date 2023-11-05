import { CustomError } from "./custom-error";

export class TokenGenerationError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ error }) {
    super("");
  }
}

export class DatabaseError extends CustomError {
  public HTTPstatusCode = 500;

  constructor(ex) {
    super(ex);
    // Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
