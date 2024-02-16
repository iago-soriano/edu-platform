import { StudentOutput } from "@domain";
import { db, studentOutput } from "@infrastructure";
import { IStudentOutputsRepository } from "@interfaces";
import { StudentOutputDtoMapper } from "../dto-mappers";

export class StudentOutputsRepository implements IStudentOutputsRepository {
  async create(output: StudentOutput) {
    const dto = StudentOutputDtoMapper.mapToInsertDto(output);

    return (
      await db
        .insert(studentOutput)
        .values(dto)
        .returning({ outputId: studentOutput.id })
    )[0];
  }
}
