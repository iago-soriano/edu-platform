import { activities, activitiesBlocks, studentOutputs } from "../schema";
import {
  ChangeEventsTree,
  ChangeTrackingProxy,
  CollectionArray,
} from "@edu-platform/common/platform";
import { ActivityBlock, StudentOutput } from "domain/entities";
import { Answer } from "domain/entities/student-output";
import { ActivityBlockSerializer } from "./activitiesBlocks";
import { OutputStatus } from "@edu-platform/common/domain/enums";

export class StudentOutputSerializer {
  static serialize = (domain: StudentOutput) => {
    const dto: typeof studentOutputs.$inferInsert = {
      id: domain.id,
      reviewerEmail: domain.reviewerEmail,
      activityId: domain.activityId,
      studentEmail: domain.studentEmail,
      status: domain.status,
      answers: JSON.stringify(domain.answers),
    };

    return dto;
  };

  static deserialize(studentOutputDto: typeof studentOutputs.$inferSelect) {
    const output = new StudentOutput(
      studentOutputDto.id,
      studentOutputDto.reviewerEmail!,
      studentOutputDto.activityId!,
      studentOutputDto.studentEmail!,
      studentOutputDto.status! as OutputStatus,
      studentOutputDto.answers as Answer[]
    );

    output.isNew = false;
    output.isDelete = false;

    return new ChangeTrackingProxy(output) as StudentOutput;
  }
}
