import { DomainRules, QuestionTypeNotFound } from "@edu-platform/common";

export const QuestionPossibleTypes = ["Multiplechoice", "Text"] as const;

export type QuestionTypeType = (typeof QuestionPossibleTypes)[number];

export abstract class Question {
  static validateQuestionType(questionType: string) {
    for (let type of QuestionPossibleTypes) {
      if (questionType === type) {
        return type;
      }
    }

    throw new QuestionTypeNotFound();
  }

  static validateTitle(title: string) {
    if (title.length > DomainRules.QUESTION.TITLE.MAX_LENGTH) {
      throw new Error(
        `Título da atividade é longo demais. Tamanho máximo permitido é de ${DomainRules.QUESTION.TITLE.MAX_LENGTH} caracteres`
      );
    } else if (title.length < DomainRules.QUESTION.TITLE.MIN_LENGTH) {
      throw new Error(
        `Título da atividade é curto demvaais. Tamanho mínimo permitido é de ${DomainRules.QUESTION.TITLE.MAX_LENGTH} caracteres`
      );
    }
  }
}
