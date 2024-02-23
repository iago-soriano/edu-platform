import { StudentOutput, StudentAnswer, TextQuestion } from "@domain";
import { DomainDtoMapper } from "./types";
import { studentAnswer } from "@infrastructure";

export const StudentAnswerDtoMapper: DomainDtoMapper<
  StudentAnswer,
  typeof studentAnswer
> = {
  mapFromSelectDto: (dto: typeof studentAnswer.$inferSelect) => {
    const answer = new StudentAnswer();

    answer.answer = dto.answer || "";
    answer.question = new TextQuestion();
    answer.studentOutput = new StudentOutput(dto.studentOutputId);

    return answer;
  },

  mapToInsertDto: (domain: StudentAnswer) => {
    if (!domain.studentOutput.id) throw new Error();

    const dto: typeof studentAnswer.$inferInsert = {
      answer: domain.answer,
      questionId: domain.question.id,
      studentOutputId: domain.studentOutput.id,
    };
    return dto;
  },
};
