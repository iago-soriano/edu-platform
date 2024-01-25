import { QuestionDTO, parseQuestionType } from "@dto";
import {
  CompleteQuestionSelectDTO,
  CompleteQuestionInsertDTO,
  QuestionSelectDTO,
} from "@interfaces";
import { TextQuestion, MultipleChoiceQuestion } from ".";
import {
  DomainRules,
  QuestionTypeNotFound,
  TextQuestionIsTooLong,
  TextQuestionIsTooShort,
  QuestionSavedInDBHasNoType,
} from "@edu-platform/common";

export enum QuestionTypes {
  MultipleChoice = "MultipleChoice",
  Text = "Text",
}

export abstract class Question {
  public id?: number;
  public versionId!: number;
  public order?: number;

  public question?: string;
  public answer?: string;

  constructor(public type: QuestionTypes) {}

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
  }

  mapToDatabaseDto(): CompleteQuestionInsertDTO {
    return {
      id: this.id,
      question: this.question,
      answer: this.answer,
      order: this.order,
      type: this.type.toString(),
      versionId: this.versionId,
    };
  }

  static mapFromDto(dto: QuestionDTO) {
    let newQuestion = null;

    // instanciate specific type and map payload
    switch (dto.type) {
      case QuestionTypes.MultipleChoice:
        newQuestion = new TextQuestion();
        break;
      case QuestionTypes.Text:
        newQuestion = new MultipleChoiceQuestion();
        newQuestion.mapAlternativesDtos(dto.alternatives);
        break;
      default:
        throw new QuestionTypeNotFound();
    }

    newQuestion.question = dto.question;
    newQuestion.answer = dto.answer;

    newQuestion.order = dto.order;

    newQuestion.id = dto.id;
    newQuestion.versionId = dto.versionId;

    return newQuestion;
  }

  static mapFromDatabaseDtoToRegularDto(
    question: CompleteQuestionSelectDTO
  ): QuestionDTO {
    if (!question.type) throw new QuestionSavedInDBHasNoType();

    return {
      type: parseQuestionType(question.type),
      order: question.order || 0,

      question: question.question || "",
      answer: question.answer || "",

      id: question.id || 0,
      versionId: question.versionId || 0,
    };
  }

  static mapFromDatabaseDto(dto: CompleteQuestionSelectDTO) {
    return this.mapFromDto(Question.mapFromDatabaseDtoToRegularDto(dto));
  }
}
