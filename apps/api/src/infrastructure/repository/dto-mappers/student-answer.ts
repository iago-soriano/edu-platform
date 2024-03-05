import { StudentOutput, StudentAnswer, TextQuestion } from "@domain";
import { DomainDtoMapper } from "./types";
import {
  studentAnswers,
  activityQuestions,
  studentOutputs,
} from "@infrastructure";
import { QuestionDtoMapper, StudentOutputDtoMapper } from ".";

export const StudentAnswerDtoMapper = {
  mapFromSelectDto: (
    dto: typeof studentAnswers.$inferSelect,
    questionDto: typeof activityQuestions.$inferSelect,
    studentOutputDto?: typeof studentOutputs.$inferSelect
  ) => {
    const answer = new StudentAnswer();

    answer.answer = dto.answer || "";
    answer.question = QuestionDtoMapper.mapFromSelectDto({
      ...questionDto,
    });

    answer.studentOutput = StudentOutputDtoMapper.mapFromSelectDto({
      id: dto.studentOutputId,
      ...studentOutputDto,
    });

    return answer;
  },

  mapToInsertDto: (domain: StudentAnswer) => {
    const dto: typeof studentAnswers.$inferInsert = {
      answer: domain.answer,
      questionId: domain.question.id!,
      studentOutputId: domain.studentOutput.id!,
      updatedAt: new Date(),
    };
    return dto;
  },
};
