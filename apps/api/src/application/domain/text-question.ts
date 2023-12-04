import {
  DomainRules,
  TextQuestionIsTooLarge,
  TextQuestionIsTooSmall,
  AnswerKeyTextQuestionIsTooLarge,
  AnswerKeyTextQuestionIsTooSmall,
} from "@edu-platform/common";

import { Question } from "./question";

export class TextQuestion extends Question {
  static validateTextLength(text: string) {
    if (text.length > DomainRules.QUESTION.TEXT.MAX_LENGTH) {
      throw new TextQuestionIsTooLarge();
    } else if (text.length < DomainRules.QUESTION.TEXT.MIN_LENGTH) {
      throw new TextQuestionIsTooSmall();
    }
  }

  static validadeAnswerKey(answerKey: string) {
    if (answerKey.length > DomainRules.QUESTION.ANSWERKEY_TEXT.MAX_LENGTH) {
      throw new AnswerKeyTextQuestionIsTooLarge();
    } else if (
      answerKey.length < DomainRules.QUESTION.ANSWERKEY_TEXT.MIN_LENGTH
    ) {
      throw new AnswerKeyTextQuestionIsTooSmall();
    }
  }

  static validateText(text: string, title: string, comment: string) {
    Question.validateTitle(title);
    TextQuestion.validateTextLength(text);
  }
}
