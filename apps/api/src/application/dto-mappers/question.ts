import {
  QuestionDTO,
  AlternativeDTO,
  QuestionTypeNotFound,
} from "@edu-platform/common";
import {
  TextQuestion,
  MultipleChoiceQuestion,
  QuestionTypes,
  Alternative,
  ActivityVersion,
} from "@domain";
import { DomainDtoMapper } from "./types";

const AlternativeDtoMapper: DomainDtoMapper<Alternative, AlternativeDTO> = {
  mapFromDto: (dto: AlternativeDTO, questionDto: QuestionDTO) => {
    const alternative = new Alternative();

    alternative.id = dto.id || 0;
    alternative.isCorrect = dto.isCorrect;
    alternative.comment = dto.comment || "";
    alternative.order = dto.order || 0;
    alternative.text = dto.text || "";

    const question = new MultipleChoiceQuestion();
    question.id = questionDto.id;

    alternative.question = question;

    return alternative;
  },
  mapToDto: (domain: Alternative) => {
    const dto: AlternativeDTO = {
      text: domain.text,
      comment: domain.comment,
      isCorrect: domain.isCorrect,
      questionId: domain.question.id || 0,
      id: domain.id,
      order: domain.order,
    };
    return dto;
  },
};

export const QuestionDtoMapper: DomainDtoMapper<
  TextQuestion | MultipleChoiceQuestion,
  QuestionDTO
> = {
  mapFromDto: (dto: QuestionDTO) => {
    let newQuestion = null;

    // instanciate specific type and map payload
    switch (dto.type) {
      case QuestionTypes.MultipleChoice:
        newQuestion = new TextQuestion();
        break;
      case QuestionTypes.Text:
        newQuestion = new MultipleChoiceQuestion();
        newQuestion.alternatives =
          dto.alternatives?.map((alternativeDto) =>
            AlternativeDtoMapper.mapFromDto(alternativeDto, dto)
          ) || [];
        break;
      default:
        throw new QuestionTypeNotFound();
    }

    newQuestion.question = dto.question;
    newQuestion.answer = dto.answer;

    newQuestion.order = dto.order;

    newQuestion.id = dto.id;

    const version = new ActivityVersion();
    version.id = dto.versionId;

    newQuestion.version = version;

    return newQuestion;
  },
  mapToDto: (domain: TextQuestion | MultipleChoiceQuestion) => {
    return {
      id: domain.id,
      question: domain.question,
      answer: domain.answer,
      order: domain.order || 0,
      type: domain.type,
      versionId: domain.version.id,
      alternatives: (domain as MultipleChoiceQuestion)?.alternatives?.map(
        (alt) => AlternativeDtoMapper.mapToDto(alt)
      ),
    };
  },
};
