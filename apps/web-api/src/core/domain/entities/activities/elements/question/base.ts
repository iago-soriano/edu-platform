import { ActivitElementDescription } from "..";
import {
  DomainRules,
  InvalidStateError,
  QuestionRequestDTO,
} from "@edu-platform/common";
import { BaseElement } from "../abstract-element";
import { QuestionTypes } from "./enums";

const throwQuestionValidationError = (message: string) => {
  throw new InvalidStateError(message, { fieldName: "question" });
};

export abstract class Question extends BaseElement {
  public question?: string;

  constructor(public type: QuestionTypes) {
    super("Question");
  }

  public isEmpty(): boolean {
    return !!this.question;
  }

  private _validateQuestionText() {
    if (!this.question) return;
    if (this.question.length > DomainRules.QUESTION.QUESTION_TEXT.MAX_LENGTH) {
      throwQuestionValidationError(
        `Text question is too long. Max length allowed is ${DomainRules.QUESTION.QUESTION_TEXT.MAX_LENGTH} characters`
      );
    } else if (
      this.question.length < DomainRules.QUESTION.QUESTION_TEXT.MIN_LENGTH
    ) {
      throwQuestionValidationError(
        `Text question is too short. Min length allowed is ${DomainRules.QUESTION.QUESTION_TEXT.MIN_LENGTH} characters`
      );
    }
  }
  public validateSelf() {
    if (this.description) this.description.validate();
    this._validateQuestionText();
  }

  protected _merge(questionDto: QuestionRequestDTO) {
    if (questionDto.description) {
      const newDesc = new ActivitElementDescription(questionDto.description);
      this.description = newDesc;
    }
    if (questionDto.question) this.question = questionDto.question;
  }
  abstract update(questionDto: QuestionRequestDTO): void;

  public checkValidityForPublication(): boolean {
    return this.isEmpty();
  }
}
