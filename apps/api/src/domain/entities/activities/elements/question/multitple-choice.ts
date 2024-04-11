import { Question, QuestionTypes } from ".";
import { DomainRules, QuestionRequestDTO } from "@edu-platform/common";
import { QuestionAlternativeFactory } from "../../factories";

export class Alternative {
  public text: string = "";
  public comment?: string;
  public isCorrect: boolean = false;

  validate() {
    if (this.text.length > 300) throw new Error("Alternative text is too long");
    if (this.comment && this.comment.length > 300)
      throw new Error("Alternative comment is too long");
  }
}

export class MultipleChoiceQuestion extends Question {
  public alternatives: Alternative[] = [];

  constructor() {
    super(QuestionTypes.MultipleChoice);
  }

  public update(questionDto: QuestionRequestDTO) {
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
