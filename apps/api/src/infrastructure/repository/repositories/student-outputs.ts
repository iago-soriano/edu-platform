import { StudentOutput } from "@domain";
import {
  activities,
  activityVersions,
  collections,
  db,
  studentOutputs,
} from "@infrastructure";
import { IStudentOutputsRepository } from "@interfaces";
import { eq } from "drizzle-orm";

export class StudentOutputsRepository implements IStudentOutputsRepository {
  async insert(output: StudentOutput) {
    // if (!output.version.id || !output.user.id)
    //   throw new Error("Missing foreign keys");
    // return (
    //   await db
    //     .insert(studentOutputs)
    //     .values(StudentOutputDtoMapper.mapToInsertDto(output))
    //     .returning({ outputId: studentOutputs.id })
    // )[0];
  }

  async getById(outputId: number) {
    // const dto = (
    //   await db
    //     .select()
    //     .from(studentOutputs)
    //     .where(eq(studentOutputs.id, outputId))
    // )[0];
    // return StudentOutputDtoMapper.mapFromSelectDto(dto);
  }

  async update(studentOutput: StudentOutput) {
    // if (!studentOutput.id) throw new Error("There must be an id to update");
    // await db
    //   .update(studentOutputs)
    //   .set(StudentOutputDtoMapper.mapToInsertDto(studentOutput))
    //   .where(eq(studentOutputs.id, studentOutput.id));
  }
}
