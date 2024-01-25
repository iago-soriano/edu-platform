import { Question, QuestionTypes } from ".";
import { QuestionDTO, AlternativeDTO } from "@dto";
import { AlternativeInsertDTO, CompleteQuestionInsertDTO } from "@interfaces";

export class Alternative {
  public id: number = 0;
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
    this.text = dto.text || "";
  }

  mapToDatabaseDto(): AlternativeInsertDTO {
    return {
      text: this.text,
      comment: this.comment,
      isCorrect: this.isCorrect,
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

  mapToDatabaseDto(): CompleteQuestionInsertDTO {
    return {
      question: super.mapToDatabaseDto().question,
      alternatives: this.alternatives.map((alt) => alt.mapToDatabaseDto()),
    };
  }
}
