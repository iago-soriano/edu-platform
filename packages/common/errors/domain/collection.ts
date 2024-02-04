import { DomainRules } from "../../domain/domain/rules";
import { CustomError } from "../custom-error";

export class UserIsNotTeacher extends CustomError {
  HTTPstatusCode = 400;
  static message = "Usuário não é professor";
  constructor() {
    super(UserIsNotTeacher.message);
  }
}

export class UserIsNotCollectionOwner extends CustomError {
  HTTPstatusCode = 400;
  static message = "Usuário não é o dono da coleção";
  constructor() {
    super(UserIsNotCollectionOwner.message);
  }
}
