import { CustomError } from "./custom-error";

export class Unauthorized extends CustomError {
  HTTPstatusCode = 401;
  constructor() {
    super("Token de acesso inválido");
  }
}

export class Forbidden extends CustomError {
  HTTPstatusCode = 403;
  constructor(realReason?: string) {
    super("", {}, realReason);
  }
}
