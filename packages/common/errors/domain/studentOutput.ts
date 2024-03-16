import { DomainRules } from "../../domain/domain/rules";
import { CustomError } from "../custom-error";

export class UserIsNotOutputAuthor extends CustomError {
  HTTPstatusCode = 400;
  static message = "Usuário não é o autor do output";
  constructor() {
    super(UserIsNotOutputAuthor.message);
  }
}

export class OutputAlreadyCompleted extends CustomError {
  HTTPstatusCode = 400;
  static message = "Output já está completo. Não pode ter seu status alterado";
  constructor() {
    super(OutputAlreadyCompleted.message);
  }
}

export class OutputStatusCanOnlyBeUpdatedToCompleted extends CustomError {
  HTTPstatusCode = 400;
  static message = "O status do output só pode ser alterado para completed";
  constructor() {
    super(OutputStatusCanOnlyBeUpdatedToCompleted.message);
  }
}
