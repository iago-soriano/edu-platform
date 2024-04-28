import { IStudentOutputsRepository } from "@core/application/interfaces";
import { eq } from "drizzle-orm";

export class StudentOutputsRepository implements IStudentOutputsRepository {
  async getById(outputId: number) {
    // const dto = (
    //   await db
    //     .select()
    //     .from(studentOutputs)
    //     .where(eq(studentOutputs.id, outputId))
    // )[0];
    // return StudentOutputDtoMapper.mapFromSelectDto(dto);
  }
}
