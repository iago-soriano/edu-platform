import { DomainRules } from "../../domain/domain/rules";
import { CustomError } from "../custom-error";

export class ActivityQuestionNotFound extends CustomError {
  HTTPstatusCode = 400;
  static message = "Question não encontrada";
  constructor() {
    super(ActivityQuestionNotFound.message);
  }
}

export class QuestionTypeNotFound extends CustomError {
  HTTPstatusCode = 400;
  static message = "Tipo de questão não encontrado";
  constructor() {
    super(QuestionTypeNotFound.message);
  }
}

export class TextQuestionIsTooLong extends CustomError {
  HTTPstatusCode = 400;
  static message = `O texto é longo demais. O tamanho máximo permitido é de ${DomainRules.QUESTION.QUESTION_TEXT.MAX_LENGTH}`;
  constructor() {
    super(TextQuestionIsTooLong.message);
  }
}

export class TextQuestionIsTooShort extends CustomError {
  HTTPstatusCode = 400;
  static message = `O texto é curto demais. O tamanho mínimo permitido é de ${DomainRules.QUESTION.QUESTION_TEXT.MIN_LENGTH}`;
  constructor() {
    super(TextQuestionIsTooShort.message);
  }
}

export class AnswerKeyTextQuestionIsTooLong extends CustomError {
  HTTPstatusCode = 400;
  static message = `A resposta é longa demais. O tamanho máximo permitido é de ${DomainRules.QUESTION.SUGGESTED_ANSWER_TEXT.MAX_LENGTH}`;
  constructor() {
    super(AnswerKeyTextQuestionIsTooLong.message);
  }
}

export class AnswerKeyTextQuestionIsTooShort extends CustomError {
  HTTPstatusCode = 400;
  static message = `A resposta é curta demais. O tamanho mínimo permitido é de ${DomainRules.QUESTION.SUGGESTED_ANSWER_TEXT.MIN_LENGTH}`;
  constructor() {
    super(AnswerKeyTextQuestionIsTooShort.message);
  }
}

export class CommentIsTooLong extends CustomError {
  HTTPstatusCode = 400;
  static message = `O comentário é longo demais. O tamanho máximo permitido é de ${DomainRules.QUESTION.CHOICE_COMMENT_TEXT.MAX_LENGTH}`;
  constructor() {
    super(CommentIsTooLong.message);
  }
}

export class CommentIsTooShort extends CustomError {
  HTTPstatusCode = 400;
  static message = `O comentário é curto demais. O tamanho mínimo permitido é de ${DomainRules.QUESTION.CHOICE_COMMENT_TEXT.MIN_LENGTH}`;
  constructor() {
    super(CommentIsTooShort.message);
  }
}

export class QuestionSavedInDBHasNoType extends CustomError {
  HTTPstatusCode = 400;
  static message = "Question saved in db has no type";
  constructor() {
    super(QuestionSavedInDBHasNoType.message);
  }
}

export class FailedToUploadFileToS3 extends CustomError {
  HTTPstatusCode = 400;
  static message = "There was an error uploading the file to S3";
  constructor() {
    super(FailedToUploadFileToS3.message);
  }
}
