import { Question, QuestionTypes } from ".";
import { QuestionDTO, AlternativeDTO } from "@dto";
import {
  AlternativeInsertDTO,
  AlternativeSelectDTO,
  CompleteQuestionInsertDTO,
  CompleteQuestionSelectDTO,
} from "@interfaces";

export class Alternative {
  public id: number = 0;
  public order: number = 0;
  public text: string = "";
  public comment?: string;
  public isCorrect: boolean = false;
  public questionId: number = 0;

  constructor() {}

  mapFromDto(dto: AlternativeDTO) {
    this.id = dto.id || 0;
    this.questionId = dto.questionId;
    this.isCorrect = dto.isCorrect;
    this.comment = dto.comment || "";
    (this.order = dto.order || 0), (this.text = dto.text || "");
  }

  mapToDatabaseDto(): AlternativeInsertDTO {
    return {
      text: this.text,
      comment: this.comment,
      isCorrect: this.isCorrect,
    };
  }

  static mapFromDatabaseToRegularDto(alt: AlternativeSelectDTO) {
    return {
      id: alt.id || 0,
      questionId: alt.questionId || 0,
      order: alt.order || 0,
      comment: alt.comment || "",
      isCorrect: alt.isCorrect || false,
      text: alt.text || "",
    };
  }
}

export class MultipleChoiceQuestion extends Question {
  public alternatives: Alternative[] = [];
  // public hasMultipleCorrect: boolean = false;

  constructor() {
    super(QuestionTypes.MultipleChoice);
  }

  validateAnswer() {
    if (!this.answer) return;
  }

  merge(newQuestion: Question) {
    super.merge(newQuestion);
    if (newQuestion instanceof MultipleChoiceQuestion)
      this.alternatives = newQuestion.alternatives;
  }

  mapAlternativesDtos(dtos?: AlternativeDTO[]) {
    if (!dtos || !dtos?.length) return;
    dtos.forEach((dto) => {
      const alternative = new Alternative();
      alternative.mapFromDto(dto);
      this.alternatives.push(alternative);
    });
  }

  static mapFromDatabaseDtoToRegularDto({
    alternatives,
    ...question
  }: CompleteQuestionSelectDTO): QuestionDTO {
    return {
      ...super.mapFromDatabaseDtoToRegularDto(question),
      alternatives: alternatives?.map((alt) =>
        Alternative.mapFromDatabaseToRegularDto(alt)
      ),
    };
  }

  mapToDatabaseDto(): CompleteQuestionInsertDTO {
    return {
      question: super.mapToDatabaseDto().question,
      alternatives: this.alternatives.map((alt) => alt.mapToDatabaseDto()),
    };
  }
}
