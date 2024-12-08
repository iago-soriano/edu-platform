import { IStudentOutputsRepository } from "application/interfaces";
import { eq, and } from "drizzle-orm";
import { AllTables } from "./all-tables";
import { BaseRepository } from "@edu-platform/common/platform";
import {
  activities,
  activitiesBlocks,
  activitiesGenerated,
  db,
  studentOutputs,
} from "../schema";
import { StudentOutputSerializer } from "../serializers/studentOutput";

export const StudentOutputEntityNames = {
  StudentOutput: AllTables["StudentOutput"],
};

export class StudentOutputsRepository
  extends BaseRepository<typeof AllTables>
  implements IStudentOutputsRepository
{
  constructor() {
    super(StudentOutputEntityNames, db);
  }

  async findStudentOutputByActivityId(
    activityId: string,
    studentEmail: string
  ) {
    const dto = await db
      .select()
      .from(studentOutputs)
      .where(
        and(
          eq(studentOutputs.activityId, activityId),
          eq(studentOutputs.studentEmail, studentEmail)
        )
      );

    if (!dto?.[0]) return null;

    const studentOutput = StudentOutputSerializer.deserialize(dto[0]);

    return studentOutput;
  }

  async findStudentOutputById(studentOutputId: string) {
    const dto = await db
      .select()
      .from(studentOutputs)
      .where(eq(studentOutputs.id, studentOutputId));

    if (!dto?.[0]) return null;

    const studentOutput = StudentOutputSerializer.deserialize(dto[0]);

    return studentOutput;
  }
}
