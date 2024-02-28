import { StudentOutput } from "@domain";
import { db, studentOutput } from "@infrastructure";
import { IStudentOutputsRepository } from "@interfaces";
import { StudentOutputDtoMapper } from "../dto-mappers";
import { eq } from "drizzle-orm";

export class StudentOutputsRepository implements IStudentOutputsRepository {
  async insert(output: StudentOutput) {
    const dto = StudentOutputDtoMapper.mapToInsertDto(output);

    return (
      await db
        .insert(studentOutput)
        .values(dto)
        .returning({ outputId: studentOutput.id })
    )[0];
  }

  async getById(outputId: number) {
    const dto = (
      await db
        .select()
        .from(studentOutput)
        .where(eq(studentOutput.id, outputId))
    )[0];

    return StudentOutputDtoMapper.mapFromSelectDto(dto);
  }
}
