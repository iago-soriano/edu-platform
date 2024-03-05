import { Alternative, MultipleChoiceQuestion } from ".";
import {
  DomainRules,
  QuestionTypeNotFound,
  TextQuestionIsTooLong,
  TextQuestionIsTooShort,
  QuestionSavedInDBHasNoType,
} from "@edu-platform/common";
import { ActivityVersion } from "../version";

export enum QuestionTypes {
  MultipleChoice = "MultipleChoice",
  Text = "Text",
}

export abstract class Question {
  public id?: number;
  public order?: number;

  public question?: string;
  public answer?: string;

  public alternatives?: Alternative[] = [];
  public version!: ActivityVersion;

  constructor(public type: QuestionTypes) {}

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
}
