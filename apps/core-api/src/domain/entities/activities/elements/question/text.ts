import { Question, QuestionTypes } from ".";
import {
  DomainRules,
  QuestionRequestDTO,
  AnswerKeyTextQuestionIsTooLong,
  AnswerKeyTextQuestionIsTooShort,
} from "@edu-platform/common";

export class TextQuestion extends Question {
  public answer?: string;

  constructor() {
    super(QuestionTypes.Text);
  }

  public update(questionDto: QuestionRequestDTO) {
    this._merge(questionDto);
    if (questionDto.answer) this.answer = questionDto.answer;
    this.validateSelf();
  }

  private _validateAnswer() {
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

  public checkValidityForPublication() {
    return !!this.answer && !this.isEmpty();
  }

  public validateSelf() {
    super.validateSelf();
    this._validateAnswer();
  }
}
