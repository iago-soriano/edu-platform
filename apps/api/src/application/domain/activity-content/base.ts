import { ContentTypeNotFound, DomainRules } from "@edu-platform/common";

export const contentPossibleTypes = [
  "Video",
  "Image",
  "Audio",
  "Text",
] as const;

export type ContentTypeTypes = (typeof contentPossibleTypes)[number];

export abstract class Content {
  constructor(
    public title: string,
    public description: string
  ) {
    this.validateDescription();
    this.validateTitle();
  }

  static validateContentType(contentType: string) {
    for (let type of contentPossibleTypes) {
      if (contentType === type) {
        return type;
      }
    }

    throw new ContentTypeNotFound();
  }

  validateTitle() {
    if (this.title.length > DomainRules.CONTENT.TITLE.MAX_LENGTH) {
      throw new Error(
        `Título da atividade é longo demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.TITLE.MAX_LENGTH} caracteres`
      );
    } else if (this.title.length < DomainRules.CONTENT.TITLE.MIN_LENGTH) {
      throw new Error(
        `Título da atividade é curto demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.TITLE.MAX_LENGTH} caracteres`
      );
    }
  }

  validateDescription() {
    if (this.description.length > DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH) {
      throw new Error(
        `Descrição da atividade é longa demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH} caracteres`
      );
    } else if (
      this.description.length < DomainRules.CONTENT.DESCRIPTION.MIN_LENGTH
    ) {
      throw new Error(
        `Descrição da atividade é curta demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH} caracteres`
      );
    }
  }
}
