import { StudentOutput } from "@core/domain/entities";
import { IAbstractRepository } from "@edu-platform/common/platform";

export interface IStudentOutputsRepository extends IAbstractRepository {
  findById: (id: number) => Promise<StudentOutput | null>;
  findByUserAndVersion: (
    userId: string,
    activityId: string,
    versionNumber: number
  ) => Promise<StudentOutput | null>;
}
