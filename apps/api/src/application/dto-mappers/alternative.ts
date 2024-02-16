import {
  AlternativeRequestDTO,
  AlternativeResponseDTO,
  QuestionRequestDTO,
} from "@edu-platform/common";
import {
  TextQuestion,
  MultipleChoiceQuestion,
  QuestionTypes,
  Alternative,
  ActivityVersion,
} from "@domain";
import { DomainDtoMapper } from "./types";

export const AlternativeDtoMapper: DomainDtoMapper<
  Alternative,
  AlternativeRequestDTO,
  AlternativeResponseDTO
> = {
  mapFromDto: (dto: AlternativeRequestDTO, questionDto: QuestionRequestDTO) => {
    const alternative = new Alternative();

    alternative.id = dto.id || 0;
    alternative.isCorrect = dto.isCorrect || false;
    alternative.comment = dto.comment || "";
    alternative.order = dto.order || 0;
    alternative.text = dto.text || "";

    const question = new MultipleChoiceQuestion();
    question.id = questionDto.id;

    alternative.question = question;

    return alternative;
  },
  mapToDto: (domain: Alternative) => {
    const dto: AlternativeResponseDTO = {
      id: domain.id,
      createdAt: domain.createdAt || new Date(),
      updatedAt: domain.updatedAt || new Date(),

      text: domain.text,
      comment: domain.comment || "",
      isCorrect: domain.isCorrect,
      questionId: domain.question.id || 0,
      order: domain.order,
    };
    return dto;
  },
};
