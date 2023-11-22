import { DomainRules } from "../domain/domain-rules";
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

export class ParameterNotProvidedError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ parameter }) {
    super("");
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

export class ActivityStatusNotFound extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("Status não encontrado");
  }
}

export class ContentTypeNotFound extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super("Tipo de conteúdo não encontrado");
  }
}

export class VideoContentIsTooLarge extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      `O vídeo é longo demais. O tamanho máximo permitido é de ${DomainRules.CONTENT.VIDEO.MAX_LENGTH}`
    );
  }
}

export class VideoContentIsTooSmall extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      `O vídeo é curto demais. O tamanho mínimo permitido é de ${DomainRules.CONTENT.VIDEO.MIN_LENGTH}`
    );
  }
}

export class AudioContentIsTooLarge extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      `O áudio é longo demais. O tamanho máximo permitido é de ${DomainRules.CONTENT.AUDIO.MAX_LENGTH}`
    );
  }
}

export class AudioContentIsTooSmall extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      `O áudio é curto demais. O tamanho mínimo permitido é de ${DomainRules.CONTENT.AUDIO.MIN_LENGTH}`
    );
  }
}

export class ImageContentIsTooLarge extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      `A imagem é grande demais. O tamanho máximo permitido é de ${DomainRules.CONTENT.IMAGE.MAX_LENGTH}`
    );
  }
}

export class ImageContentIsTooSmall extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      `A imagem é pequena demais. O tamanho mínimo permitido é de ${DomainRules.CONTENT.IMAGE.MIN_LENGTH}`
    );
  }
}

export class TextContentIsTooLarge extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      `O texto é grande demais. O tamanho máximo permitido é de ${DomainRules.CONTENT.TEXT.MAX_LENGTH}`
    );
  }
}

export class TextContentIsTooSmall extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(
      `O texto é curto demais. O tamanho mínimo permitido é de ${DomainRules.CONTENT.TEXT.MIN_LENGTH}`
    );
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
