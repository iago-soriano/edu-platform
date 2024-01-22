import { DomainRules } from "../domain/domain/rules";
import { CustomError } from "./custom-error";

export class RouteNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super("{ errorName: ErrorMessagesLabels.ROUTE_NOT_FOUND }");
  }
}

export class CannotAlterUserError extends CustomError {
  HTTPstatusCode = 403;
  constructor() {
    super("{ errorName: ErrorMessagesLabels.CANNOT_ALTER_THIS_USER }");
  }
}

export class InvalidParameterError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("");
  }
}

export class UserNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super("USER_NOT_FOUND");
  }
}

export class ActivityIsNotFound extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("Atividade não encontrada");
  }
}

export class ActivityContentNotFound extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(`Content não encontrado`);
  }
}

export class ActivityContentNotCreated extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(`Não foi possível criar o novo conteúdo`);
  }
}

export class ActivityVersionNotFound extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(`Essa versão da atividade não foi encontrada`);
  }
}

export class UserNotActivityAuthor extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("O usuário não é o autor desta atividade");
  }
}

export class ActivityIsNotDraft extends CustomError {
  HTTPstatusCode = 400;
  static message = "A atividade não é um draft";
  constructor() {
    super(ActivityIsNotDraft.message);
  }
}

export class ContentTypeNotFound extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("Tipo de conteúdo não encontrado");
  }
}

export class ContentPayloadUndefined extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("Payload do content não pode ser undefined");
  }
}

export class TextContentIsTooLarge extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("", {
      content: `O texto é grande demais. O tamanho máximo permitido é de ${DomainRules.CONTENT.TEXT.MAX_LENGTH} caracteres`,
    });
  }
}

export class TextContentIsTooSmall extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("", {
      content: `O texto é curto demais. O tamanho mínimo permitido é de ${DomainRules.CONTENT.TEXT.MIN_LENGTH} caracteres`,
    });
  }
}

export class QuestionTypeNotFound extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("Tipo de questão não encontrado");
  }
}

export class TextQuestionIsTooLarge extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      `O texto é longo demais. O tamanho máximo permitido é de ${DomainRules.QUESTION.TEXT.MAX_LENGTH}`
    );
  }
}

export class TextQuestionIsTooSmall extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      `O áudio é curto demais. O tamanho mínimo permitido é de ${DomainRules.QUESTION.TEXT.MIN_LENGTH}`
    );
  }
}

export class AnswerKeyTextQuestionIsTooLarge extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      `A resposta é longa demais. O tamanho máximo permitido é de ${DomainRules.QUESTION.ANSWERKEY_TEXT.MAX_LENGTH}`
    );
  }
}

export class AnswerKeyTextQuestionIsTooSmall extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      `A resposta é curta demais. O tamanho mínimo permitido é de ${DomainRules.QUESTION.ANSWERKEY_TEXT.MIN_LENGTH}`
    );
  }
}

export class CommentIsTooLarge extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      `O comentário é longo demais. O tamanho máximo permitido é de ${DomainRules.QUESTION.ANSWERKEY_TEXT.MAX_LENGTH}`
    );
  }
}

export class CommentIsTooSmall extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      `O comentário é curto demais. O tamanho mínimo permitido é de ${DomainRules.QUESTION.ANSWERKEY_TEXT.MIN_LENGTH}`
    );
  }
}

export class TitleIsTooShort extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("", {
      title: `Título é curto demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.TITLE.MIN_LENGTH} caracteres`,
    });
  }
}

export class TitleIsTooLong extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("", {
      title: `Título é longo demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.TITLE.MAX_LENGTH} caracteres`,
    });
  }
}

export class DescriptionIsTooShort extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("", {
      description: `Descrição é curta demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.DESCRIPTION.MIN_LENGTH} caracteres`,
    });
  }
}

export class DescriptionIsTooLong extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("", {
      description: `Descrição é longa demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH} caracteres`,
    });
  }
}

export class HasTooManyTopics extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("", {
      topics: `Há tópicos demais. Número máximo permitido é de ${DomainRules.ACTIVITY.TOPICS.MAX_COUNT}`,
    });
  }
}

export class UnprocessableEntity extends CustomError {
  HTTPstatusCode = 422;
  constructor(message: string) {
    super(message);
  }
}
