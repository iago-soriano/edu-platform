import { DomainRules } from "../../domain/domain/rules";
import { CustomError } from "../custom-error";

export class ActivityVersionNotFound extends CustomError {
  HTTPstatusCode = 404;
  static message = "Versão da atividade não encontrada";
  constructor() {
    super(ActivityVersionNotFound.message);
  }
}

export class ActivityVersionIsNotDraft extends CustomError {
  HTTPstatusCode = 400;
  static message = "A atividade não é um draft";
  constructor() {
    super(ActivityVersionIsNotDraft.message);
  }
}

export class UserIsNotDraftAuthor extends CustomError {
  HTTPstatusCode = 400;
  static message = "Non-author cannot get draft version";
  constructor() {
    super(UserIsNotDraftAuthor.message);
  }
}

export class FailedToUpdateVersionStatus extends CustomError {
  HTTPstatusCode = 400;
  static message = (status: string, newStatus: string) =>
    `Can't update from version ${status} to ${newStatus}`;
  constructor(status: string, newStatus: string) {
    super(FailedToUpdateVersionStatus.message(status, newStatus));
  }
}

export class ActivityVersionHasNoContent extends CustomError {
  HTTPstatusCode = 400;
  static message = "Não há conteúdos, não se pode publicar uma atividade vazia";
  constructor() {
    super(ActivityVersionHasNoContent.message);
  }
}
