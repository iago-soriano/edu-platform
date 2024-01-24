import { DomainRules } from "../../domain/domain/rules";
import { CustomError } from "../custom-error";

export class ActivityNotFound extends CustomError {
  HTTPstatusCode = 400;
  static message = "Atividade não encontrada";
  constructor() {
    super(ActivityNotFound.message);
  }
}

export class UserNotActivityAuthor extends CustomError {
  HTTPstatusCode = 400;
  static message = "Usuário não é o autor da atividade";
  constructor() {
    super(UserNotActivityAuthor.message);
  }
}
