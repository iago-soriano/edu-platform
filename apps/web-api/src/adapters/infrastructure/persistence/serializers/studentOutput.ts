import { studentOutputs } from "../schema";
import {
  ChangeEventsTree,
  ChangeTrackingProxy,
} from "@edu-platform/common/platform";
import { StudentOutput } from "domain/entities";
import { Answer } from "domain/entities/student-output";

export class StudentOutputSerializer {
  static serialize = (domain: StudentOutput) => {
    const dto: typeof studentOutputs.$inferInsert = {
      id: domain.id,
      requestingUserId: domain.requestingUserId,
      activityId: domain.activityId,
      studentEmail: domain.studentEmail,
      status: domain.status,
      answers: JSON.stringify(domain.answers),
    };

    return dto;
  };

  static deserialize(dto: typeof studentOutputs.$inferSelect) {
    const output = new StudentOutput(
      dto.id,
      dto.requestingUserId!,
      dto.activityId!,
      dto.studentEmail!,
      dto.status!,
      JSON.parse(dto.answers as string) as Answer[]
    );

    const proxiedEntity = new ChangeTrackingProxy(output) as StudentOutput;

    return proxiedEntity;
  }
}
