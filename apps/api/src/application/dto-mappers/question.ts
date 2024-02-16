import {
  QuestionRequestDTO,
  QuestionResponseDTO,
  QuestionTypeNotFound,
  VersionRequestDTO,
} from "@edu-platform/common";
import {
  TextQuestion,
  MultipleChoiceQuestion,
  QuestionTypes,
  Alternative,
  ActivityVersion,
} from "@domain";
import { DomainDtoMapper } from "./types";
import { AlternativeDtoMapper } from "./alternative";

export const QuestionDtoMapper: DomainDtoMapper<
  TextQuestion | MultipleChoiceQuestion,
  QuestionRequestDTO,
  QuestionResponseDTO
> = {
  mapFromDto: (dto: QuestionRequestDTO, versionDto: VersionRequestDTO) => {
    let newQuestion = null;

    // instanciate specific type and map payload
    switch (dto.type) {
      case QuestionTypes.Text:
        newQuestion = new TextQuestion();
        break;
      case QuestionTypes.MultipleChoice:
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
    version.id = versionDto.id;

    newQuestion.version = version;

    return newQuestion;
  },
  mapToDto: (domain: TextQuestion | MultipleChoiceQuestion) => {
    const dto: QuestionResponseDTO = {
      id: domain.id || 0,
      // createdAt: domain.createdAt || new Date(),
      // updatedAt: domain.updatedAt || new Date(),

      question: domain.question || "",
      answer: domain.answer || "",
      order: domain.order || 0,
      type: domain.type,
      versionId: domain.version.id,
      alternatives: (domain as MultipleChoiceQuestion)?.alternatives?.map(
        (alt) => AlternativeDtoMapper.mapToDto(alt)
      ),
    };
    return dto;
  },
};
