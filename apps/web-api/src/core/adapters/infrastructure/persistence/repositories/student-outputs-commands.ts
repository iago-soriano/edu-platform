import { IStudentOutputsRepository } from "@core/application/interfaces";
import { eq, and } from "drizzle-orm";
import { AllTables } from "./all-tables";
import { BaseRepository } from "@edu-platform/common/platform";
import { db, studentAnswers, studentOutputs } from "../schema";
import { StudentOutputSerializer } from "../serializers";

export const StudentOutputEntityNames = {
  StudentOutput: AllTables["StudentOutput"],
  StudentAnswer: AllTables["StudentAnswer"],
};

export class StudentOutputsRepository
  extends BaseRepository<typeof StudentOutputEntityNames>
  implements IStudentOutputsRepository
{
  constructor() {
    super(StudentOutputEntityNames, db);
  }
  async findById(id: number) {
    const dto = await db
      .select()
      .from(studentOutputs)
      .leftJoin(
        studentAnswers,
        eq(studentAnswers.studentOutputId, studentOutputs.id)
      )
      .where(eq(studentOutputs.id, id));

    return StudentOutputSerializer.deserialize(
      dto[0].student_outputs,
      dto.map(({ student_answers }) => student_answers)
    );
  }
  async findByUserAndVersion(
    userId: string,
    activityId: string,
    versionNumber: number
  ) {
    const dto = (
      await db
        .select()
        .from(studentOutputs)
        .where(
          and(
            eq(studentOutputs.studentId, userId),
            eq(studentOutputs.activityId, activityId),
            eq(studentOutputs.versionNumber, versionNumber)
          )
        )
    )[0];

    return StudentOutputSerializer.deserialize(dto, null);
  }
}
