import { studentOutputs } from "../../schema";
import { OutputStatus, StudentOutput } from "@core/domain/entities";
import { ChangeTrackingProxy } from "@edu-platform/common/platform";

export class StudentOutputSerializer {
  static serialize(domain: StudentOutput) {
    const dto: typeof studentOutputs.$inferInsert = {
      id: domain.id as number,
      studentId: domain.studentId,
      versionId: domain.versionId,
      activityAuthorId: domain.activityAuthorId,
      outputStatus: domain.outputStatus,
      feedbackStatus: domain.feedbackStatus,
    };
    return dto;
  }

  static deserialize(dto: typeof studentOutputs.$inferSelect) {
    const studentOutput = new StudentOutput();

    studentOutput.id = dto.id;
    studentOutput.studentId = dto.studentId;
    studentOutput.versionId = dto.versionId;
    studentOutput.activityAuthorId = dto.activityAuthorId;
    studentOutput.outputStatus = dto.outputStatus as OutputStatus;
    studentOutput.feedbackStatus = dto.feedbackStatus as OutputStatus;

    const proxiedEntity = new ChangeTrackingProxy(
      studentOutput
    ) as StudentOutput;

    return proxiedEntity;
  }
}
