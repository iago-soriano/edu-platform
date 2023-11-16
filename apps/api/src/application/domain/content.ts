import { ContentTypeNotFound, DomainRules } from "@edu-platform/common";

export const contentPossibleType = ["Video", "Image", "Audio", "Text"] as const;

export type ContentTypeType = (typeof contentPossibleType)[number];

export class Content {
  constructor(
    public title: string,
    public description: string,
    public content: string
  ) {}

  static validateContentType(contentType: string) {
    for (let type of contentPossibleType) {
      if (contentType === type) {
        return type;
      }
    }

    throw new ContentTypeNotFound();
  }

  static validateTitle(title: string) {
    if (title.length > DomainRules.CONTENT.TITLE.MAX_LENGTH) {
      throw new Error(
        `Título da atividade é longo demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.TITLE.MAX_LENGTH} caracteres`
      );
    } else if (title.length < DomainRules.CONTENT.TITLE.MIN_LENGTH) {
      throw new Error(
        `Título da atividade é curto demvaais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.TITLE.MAX_LENGTH} caracteres`
      );
    }
  }

  static validateDescription(description: string) {
    if (description.length > DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH) {
      throw new Error(
        `Descrição da atividade é longa demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.TITLE.MAX_LENGTH} caracteres`
      );
    } else if (
      description.length < DomainRules.CONTENT.DESCRIPTION.MIN_LENGTH
    ) {
      throw new Error(
        `Descrição da atividade é curta demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.TITLE.MAX_LENGTH} caracteres`
      );
    }
  }
}
