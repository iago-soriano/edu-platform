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

export class StudentIsNotUser extends CustomError {
  HTTPstatusCode = 400;
  static message = "Estudante não cadastrado na plataforma";
  constructor() {
    super(StudentIsNotUser.message);
  }
}

export class StudentIsNotParticipant extends CustomError {
  HTTPstatusCode = 400;
  static message = "Cannot create output for this activity: no participation";
  constructor() {
    super(StudentIsNotParticipant.message);
  }
}
