import { FieldError } from "../api/interfaces";

export abstract class CustomError extends Error {
  abstract HTTPstatusCode?: number;
  constructor(
    message?: string,
    public errors: FieldError = {}
  ) {
    super(message);
  }
}
