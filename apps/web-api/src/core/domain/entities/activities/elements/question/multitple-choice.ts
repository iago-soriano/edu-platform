import { Question } from ".";
import {
  InvalidStateError,
  SaveQuestionRequestBody,
} from "@edu-platform/common";
import { QuestionAlternativeFactory } from "../../factories";
import { QuestionTypes } from "./enums";

export { QuestionTypes } from "./enums";

const throwAlternativeValidationError = (message: string) => {
  throw new InvalidStateError(message, { fieldName: "alternative" });
};

export class Alternative {
  public text: string = "";
  public comment?: string;
  public isCorrect: boolean = false;

  validate() {
    if (this.text.length > 300)
      throwAlternativeValidationError("Alternative text is too long");
    if (this.comment && this.comment.length > 300)
      throwAlternativeValidationError("Alternative comment is too long");
  }
}

export class MultipleChoiceQuestion extends Question {
  public alternatives: Alternative[] = [];

  constructor() {
    super(QuestionTypes.MultipleChoice);
  }

  public update(questionDto: SaveQuestionRequestBody) {
    this._merge(questionDto);
    if (questionDto.alternatives)
      this.alternatives = QuestionAlternativeFactory.fromRequestDto(
        questionDto.alternatives
      );

    this.validateSelf();
  }

  public checkValidityForPublication() {
    const hasAtLeastOneCorrectAlternative =
      this.alternatives?.reduce(
        (prev, curr) => prev || curr.isCorrect,
        false
      ) || false;
    return hasAtLeastOneCorrectAlternative && !this.isEmpty();
  }

  public validateSelf() {
    super.validateSelf();
    for (const alt of this.alternatives) {
      alt.validate();
    }
  }
}
