import { Alternative, MultipleChoiceQuestion } from ".";
import {
  DomainRules,
  QuestionTypeNotFound,
  TextQuestionIsTooLong,
  TextQuestionIsTooShort,
  QuestionSavedInDBHasNoType,
} from "@edu-platform/common";
import { BaseElement } from "../abstract-element";

export enum QuestionTypes {
  MultipleChoice = "MultipleChoice",
  Text = "Text",
}

export abstract class Question extends BaseElement {
  public question?: string;
  public answer?: string;

  public alternatives?: Alternative[] = [];

  constructor(public type: QuestionTypes) {
    super("Question");
  }

  abstract validateAnswer(): void;

  validateQuestionText() {
    if (!this.question) return;
    if (this.question.length > DomainRules.QUESTION.QUESTION_TEXT.MAX_LENGTH) {
      throw new TextQuestionIsTooLong();
    } else if (
      this.question.length < DomainRules.QUESTION.QUESTION_TEXT.MIN_LENGTH
    ) {
      throw new TextQuestionIsTooShort();
    }
  }

  merge(newQuestion: Question) {
    this.question = newQuestion.question;
    this.answer = newQuestion.answer;
    this.order = newQuestion.order;
    if (newQuestion instanceof MultipleChoiceQuestion)
      this.alternatives = newQuestion.alternatives;
  }

  checkValidityForPublication(): boolean {
    return this.isEmpty();
  }

  isEmpty(): boolean {
    return !!this.question;
  }

  storedFileUrl() {
    return null;
  }
}
