import { activities, activitiesBlocks, db, studentOutputs } from "../schema";
import { IStudentOutputsReadRepository } from "application/interfaces";
import { eq } from "drizzle-orm";
import {
  ActivityBlockType,
  OutputStatus,
} from "@edu-platform/common/domain/enums";
import { Answer } from "domain/entities/student-output";

export class StudentOutputsReadRepository
  implements IStudentOutputsReadRepository
{
  async getStudentOutputById(studentOutputId: string) {
    const output = await db
      .select()
      .from(studentOutputs)
      .where(eq(studentOutputs.id, studentOutputId))
      .leftJoin(activities, eq(activities.id, studentOutputs.activityId))
      .leftJoin(
        activitiesBlocks,
        eq(activitiesBlocks.activityId, studentOutputs.activityId)
      );

    return {
      id: output[0].studentOutput.id,
      reviewerEmail: output[0].studentOutput.reviewerEmail,
      activityId: output[0].studentOutput.activityId,
      studentEmail: output[0].studentOutput.studentEmail,
      status: output[0].studentOutput.status as OutputStatus,
      answers: output[0].studentOutput.answers as Answer[],
      title: output[0].activities?.title || "",

      activityBlocks: output.map((o) => ({
        id: o.activitiesBlocks?.id || "",
        type: o.activitiesBlocks?.type as ActivityBlockType,
        data: o.activitiesBlocks?.data,
      })),
    };
  }
}
