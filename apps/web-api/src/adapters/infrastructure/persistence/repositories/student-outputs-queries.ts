import { db, studentOutputs } from "../schema";
import { IStudentOutputsReadRepository } from "application/interfaces";
import { eq } from "drizzle-orm";
import { OutputStatus } from "@edu-platform/common/domain/domain/enums";

export class StudentOutputsReadRepository
  implements IStudentOutputsReadRepository
{
  async getStudentOutputById(studentOutputId: string) {
    const output = await db
      .select()
      .from(studentOutputs)
      .where(eq(studentOutputs.id, studentOutputId));

    return {
      id: output[0].id,
      requestingUserId: output[0].requestingUserId,
      activityId: output[0].activityId,
      studentEmail: output[0].studentEmail,
      status: output[0].status as OutputStatus,
      answers: JSON.parse(output[0].answers as string),
    };
  }
}
