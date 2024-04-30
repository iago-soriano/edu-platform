import { IStudentOutputsRepository } from "@core/application/interfaces";
import { eq } from "drizzle-orm";
import { AllTables } from "./all-tables";
import { BaseRepository } from "@edu-platform/common/platform";
import { db, studentOutputs } from "../schema";
import { StudentOutputSerializer } from "../serializers";

export const StudentOutputEntityNames = {
  StudentOutput: AllTables["StudentOutput"],
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
      .where(eq(studentOutputs.id, id));

    const output = StudentOutputSerializer.deserialize(dto[0]);

    return output;
  }
  async findByUserAndVersion(userId: string, versionId: string) {}
}
