import { DomainRules } from "../../domain/domain/rules";
import { CustomError } from "../custom-error";

export class ActivityContentNotFound extends CustomError {
  HTTPstatusCode = 400;
  static message = "Content não encontrado";
  constructor() {
    super(ActivityContentNotFound.message);
  }
}

export class ActivityContentNotCreated extends CustomError {
  HTTPstatusCode = 400;
  static message = "Content não criado";
  constructor() {
    super(ActivityContentNotCreated.message);
  }
}

export class ContentTypeNotFound extends CustomError {
  HTTPstatusCode = 422;
  static message = "Tipo de conteúdo não encontrado";
  constructor() {
    super(ContentTypeNotFound.message);
  }
}

export class ContentPayloadUndefined extends CustomError {
  HTTPstatusCode = 400;
  static message = "Payload do content não pode ser undefined";
  constructor() {
    super(ContentPayloadUndefined.message);
  }
}

export class ContentSavedInDBHasNoType extends CustomError {
  HTTPstatusCode = 400;
  static message = "Content saved in db has no type";
  constructor() {
    super(ContentSavedInDBHasNoType.message);
  }
}

export class ContentDoesNotImplementFiles extends CustomError {
  HTTPstatusCode = 400;
  static message = (type: string) =>
    `Content of type ${type} does not implement file`;
  constructor(type: string) {
    super(ContentDoesNotImplementFiles.message(type));
  }
}

export class ContentIsHalfCompleted extends CustomError {
  HTTPstatusCode = 400;
  static message = (title?: string, description?: string) =>
    `Um conteúdo tem apenas título e/ou descrição. Termine-o ou exclua-o antes de publicar a atividade. Título: ${title}. Descrição: ${description}`;
  constructor(title?: string, description?: string) {
    super(ContentIsHalfCompleted.message(title, description));
  }
}

export class TextContentIsTooLong extends CustomError {
  HTTPstatusCode = 400;
  static message = `O texto é grande demais. O tamanho máximo permitido é de ${DomainRules.CONTENT.TEXT.MAX_LENGTH} caracteres`;
  constructor() {
    super("", { text: TextContentIsTooLong.message });
  }
}

export class TextContentIsTooShort extends CustomError {
  HTTPstatusCode = 400;
  static message = `O texto é curto demais. O tamanho mínimo permitido é de ${DomainRules.CONTENT.TEXT.MIN_LENGTH} caracteres`;
  constructor() {
    super("", { text: TextContentIsTooShort.message });
  }
}

export class ContentTitleIsTooLong extends CustomError {
  HTTPstatusCode = 400;
  static message = `Título é long demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.TITLE.MAX_LENGTH} caracteres`;
  constructor() {
    super("", { title: ContentTitleIsTooLong.message });
  }
}

export class ContentTitleIsTooShort extends CustomError {
  HTTPstatusCode = 400;
  static message = `Título é curto demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.TITLE.MIN_LENGTH} caracteres`;
  constructor() {
    super("", { title: ContentTitleIsTooShort.message });
  }
}

export class ContentDescriptionIsTooLong extends CustomError {
  HTTPstatusCode = 400;
  static message = `Descrição é longa demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH} caracteres`;
  constructor() {
    super("", { description: ContentDescriptionIsTooLong.message });
  }
}

export class ContentDescriptionIsTooShort extends CustomError {
  HTTPstatusCode = 400;
  static message = `Descrição é curta demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.DESCRIPTION.MIN_LENGTH} caracteres`;
  constructor() {
    super("", { description: ContentDescriptionIsTooShort.message });
  }
}

export class VideoContentHasToManyTracks extends CustomError {
  HTTPstatusCode = 400;
  static message = `Há faixas demais. O número máximo é de ${DomainRules.CONTENT.VIDEO.TRACKS_MAX_NUM} faixas`;
  constructor() {
    super("", { tracks: VideoContentHasToManyTracks.message });
  }
}
