import { studentAnswers } from "../../schema";
import { OutputStatus, StudentAnswer } from "@core/domain/entities";
import { ChangeTrackingProxy } from "@edu-platform/common/platform";

export class StudentAnswerSerializer {
  static serialize(domain: StudentAnswer) {
    const dto: typeof studentAnswers.$inferInsert = {
      id: domain.id as number,
      questionId: domain.questionId,
      answer: domain.answer,
      studentOutputId: domain.studentOutputId,
      feedbackEmoji: domain.feedbackEmoji,
      feedbackText: domain.feedbackText,
    };
    return dto;
  }

  static deserialize(dto: typeof studentAnswers.$inferSelect) {
    const studentAnswer = new StudentAnswer();

    studentAnswer.id = dto.id;
    studentAnswer.questionId = dto.questionId;
    studentAnswer.answer = dto.answer as string;
    studentAnswer.studentOutputId = dto.studentOutputId;
    studentAnswer.feedbackEmoji = dto.feedbackEmoji || "";
    studentAnswer.feedbackText = dto.feedbackText || "";

    const proxiedEntity = new ChangeTrackingProxy(
      studentAnswer
    ) as StudentAnswer;

    return proxiedEntity;
  }
}
