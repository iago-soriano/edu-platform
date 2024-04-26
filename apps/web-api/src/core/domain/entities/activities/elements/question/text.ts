import { Question, QuestionTypes } from ".";
import {
  DomainRules,
  QuestionRequestDTO,
  InvalidStateError,
} from "@edu-platform/common";

const throwQuestionValidationError = (message: string) => {
  throw new InvalidStateError(message, { fieldName: " text" });
};

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
      throwQuestionValidationError(
        `Text question is too long. Max length allowed is ${DomainRules.QUESTION.SUGGESTED_ANSWER_TEXT.MAX_LENGTH} characters`
      );
    } else if (
      this.answer.length < DomainRules.QUESTION.SUGGESTED_ANSWER_TEXT.MIN_LENGTH
    ) {
      throwQuestionValidationError(
        `Text question is too short. Min length allowed is ${DomainRules.QUESTION.SUGGESTED_ANSWER_TEXT.MIN_LENGTH} characters`
      );
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
