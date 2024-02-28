import { IdGeneratorMockBuilder } from "./../../../test/mock-factories/services/id";
import { Question, QuestionTypes } from ".";
import {
  DomainRules,
  AnswerKeyTextQuestionIsTooLong,
  AnswerKeyTextQuestionIsTooShort,
} from "@edu-platform/common";

export class TextQuestion extends Question {
  constructor(id?: number) {
    super(QuestionTypes.Text);
    this.id = id;
  }

  validateAnswer() {
    if (!this.answer) return;
    if (
      this.answer.length > DomainRules.QUESTION.SUGGESTED_ANSWER_TEXT.MAX_LENGTH
    ) {
      throw new AnswerKeyTextQuestionIsTooLong();
    } else if (
      this.answer.length < DomainRules.QUESTION.SUGGESTED_ANSWER_TEXT.MIN_LENGTH
    ) {
      throw new AnswerKeyTextQuestionIsTooShort();
    }
  }
}
