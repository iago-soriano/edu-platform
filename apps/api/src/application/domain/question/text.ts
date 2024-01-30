import { Question, QuestionTypes } from ".";
import {
  DomainRules,
  AnswerKeyTextQuestionIsTooLong,
  AnswerKeyTextQuestionIsTooShort,
} from "@edu-platform/common";

export class TextQuestion extends Question {
  constructor() {
    super(QuestionTypes.Text);
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
