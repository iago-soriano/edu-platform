import { CustomError } from "./custom-error";

export class TokenGenerationError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ error }: { error: string }) {
    super(error);
  }
}
