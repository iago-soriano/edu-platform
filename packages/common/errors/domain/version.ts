import { DomainRules } from "../../domain/domain/rules";
import { CustomError } from "../custom-error";

export class ActivityVersionNotFound extends CustomError {
  HTTPstatusCode = 400;
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

export class ActivityVersionHasTooManyTopics extends CustomError {
  HTTPstatusCode = 400;
  static message = `Há tópicos demais. Número máximo permitido é de ${DomainRules.ACTIVITY.TOPICS.MAX_COUNT}`;
  constructor() {
    super("", { topics: ActivityVersionHasTooManyTopics.message });
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

export class ActivityVersionHasNoTitleOrNoDescription extends CustomError {
  HTTPstatusCode = 400;
  static message = "Atividade deve haver título e descrição";
  constructor() {
    super(ActivityVersionHasNoTitleOrNoDescription.message);
  }
}

export class ActivityTitleIsTooLong extends CustomError {
  HTTPstatusCode = 400;
  static message = `Título é long demais. Tamanho máximo permitido é de ${DomainRules.ACTIVITY.TITLE.MAX_LENGTH} caracteres`;
  constructor() {
    super("", { title: ActivityTitleIsTooLong.message });
  }
}

export class ActivityTitleIsTooShort extends CustomError {
  HTTPstatusCode = 400;
  static message = `Título é curto demais. Tamanho mínimo permitido é de ${DomainRules.ACTIVITY.TITLE.MIN_LENGTH} caracteres`;
  constructor() {
    super("", { title: ActivityTitleIsTooShort.message });
  }
}

export class ActivityDescriptionIsTooLong extends CustomError {
  HTTPstatusCode = 400;
  static message = `Descrição é longa demais. Tamanho máximo permitido é de ${DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH} caracteres`;
  constructor() {
    super("", { description: ActivityDescriptionIsTooLong.message });
  }
}

export class ActivityDescriptionIsTooShort extends CustomError {
  HTTPstatusCode = 400;
  static message = `Descrição é curta demais. Tamanho mínimo permitido é de ${DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH} caracteres`;
  constructor() {
    super("", { description: ActivityDescriptionIsTooShort.message });
  }
}
