import { studentOutputs } from '../schema';
import {
  ChangeEventsTree,
  ChangeTrackingProxy,
} from '@edu-platform/common/platform';
import { StudentOutput } from 'domain/entities';

export class StudentOutputSerializer {
  static serialize = (domain: StudentOutput) => {
    const dto: typeof studentOutputs.$inferInsert = {
      id: domain.id,
      requestingUserId: domain.requestingUserId,
      activityId: domain.activityId,
      studentEmail: domain.studentEmail,
      status: domain.status,
    };

    return dto;
  };

  static deserialize(dto: typeof studentOutputs.$inferSelect) {
    const output = new StudentOutput();

    output.id = dto.id;
    output.requestingUserId = dto.requestingUserId!;
    output.activityId = dto.activityId!;
    output.studentEmail = dto.studentEmail!;
    output.status = dto.status!;

    const proxiedEntity = new ChangeTrackingProxy(output) as StudentOutput;

    return proxiedEntity;
  }
}
