import { ActivitElementDescription } from "..";
import {
  DomainRules,
  QuestionRequestDTO,
  TextQuestionIsTooLong,
  TextQuestionIsTooShort,
} from "@edu-platform/common";
import { BaseElement } from "../abstract-element";

export enum QuestionTypes {
  MultipleChoice = "MultipleChoice",
  Text = "Text",
}

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
      throw new TextQuestionIsTooLong();
    } else if (
      this.question.length < DomainRules.QUESTION.QUESTION_TEXT.MIN_LENGTH
    ) {
      throw new TextQuestionIsTooShort();
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
