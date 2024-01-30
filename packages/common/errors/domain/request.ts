import { CustomError } from "../custom-error";

export class InvalidParameterError extends CustomError {
  HTTPstatusCode = 400;
  static message = "Parâmetro inválido";
  constructor() {
    super(InvalidParameterError.message);
  }
}

export class UnprocessableEntity extends CustomError {
  HTTPstatusCode = 422;
  constructor(message: string) {
    super(message);
  }
}