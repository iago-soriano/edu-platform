import { CustomError } from "./custom-error";

export class Unauthorized extends CustomError {
  HTTPstatusCode = 401;
  static message = "Token de acesso inválido";
  constructor() {
    super(Unauthorized.message);
  }
}

export class Forbidden extends CustomError {
  HTTPstatusCode = 403;
  static message = (realReason?: string) => `${realReason}`;
  constructor(realReason?: string) {
    super(Forbidden.message(realReason));
  }
}
