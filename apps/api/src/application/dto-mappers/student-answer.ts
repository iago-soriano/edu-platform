import {
  StudentAnswerRequestDTO,
  StudentAnswerResponseDTO,
} from "@edu-platform/common";
import { StudentAnswer, StudentOutput, TextQuestion } from "@domain";
import { DomainDtoMapper } from "./types";

export const StudentAnswerDtoMapper: DomainDtoMapper<
  StudentAnswer,
  StudentAnswerRequestDTO,
  StudentAnswerResponseDTO
> = {
  mapFromDto: (dto: StudentAnswerRequestDTO) => {
    const answer = new StudentAnswer();

    answer.question = new TextQuestion() || undefined;
    answer.answer = dto.answer || "";
    answer.studentOutput = new StudentOutput(dto.studentOutputId);

    return answer;
  },

  mapToDto: (domain: StudentAnswer) => {
    if (!domain.studentOutput.id) throw new Error();

    const dto: StudentAnswerResponseDTO = {
      questionId: domain.question.id || 0,
      answer: domain.answer || "",
      studentOutputId: domain.studentOutput.id,
    };
    return dto;
  },
};
