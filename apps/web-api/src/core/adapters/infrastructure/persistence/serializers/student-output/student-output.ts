import { studentAnswers, studentOutputs } from "../../schema";
import {
  OutputStatus,
  StudentAnswer,
  StudentOutput,
} from "@core/domain/entities";
import {
  ChangeTrackingProxy,
  CollectionArray,
} from "@edu-platform/common/platform";
import { StudentAnswerSerializer } from "./student-answer";

export class StudentOutputSerializer {
  static serialize(domain: StudentOutput) {
    const dto: typeof studentOutputs.$inferInsert = {
      id: domain.id as number,
      studentId: domain.studentId,
      activityId: domain.activityId,
      versionNumber: domain.versionNumber,
      activityAuthorId: domain.activityAuthorId,
      outputStatus: domain.outputStatus,
      feedbackStatus: domain.feedbackStatus,
    };
    return dto;
  }

  static deserialize(
    dto: typeof studentOutputs.$inferSelect,
    studentAnswerDtos: (typeof studentAnswers.$inferSelect | null)[] | null
  ) {
    const studentOutput = new StudentOutput();

    studentOutput.id = dto.id;
    studentOutput.studentId = dto.studentId;
    studentOutput.activityId = dto.activityId;
    studentOutput.versionNumber = dto.versionNumber;
    studentOutput.activityAuthorId = dto.activityAuthorId;
    studentOutput.outputStatus = dto.outputStatus as OutputStatus;
    studentOutput.feedbackStatus = dto.feedbackStatus as OutputStatus;
    studentOutput.answers = new CollectionArray<StudentAnswer>();

    if (studentAnswerDtos) {
      for (const answer of studentAnswerDtos) {
        if (answer)
          studentOutput.answers.push(
            StudentAnswerSerializer.deserialize(answer)
          );
      }
    }

    const proxiedEntity = new ChangeTrackingProxy(
      studentOutput
    ) as StudentOutput;

    return proxiedEntity;
  }
}
