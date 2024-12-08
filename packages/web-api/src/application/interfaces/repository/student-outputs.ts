import { IAbstractRepository } from "@edu-platform/common/platform";
import {
  GetStudentOutputByIdResponseBody,
  PaginatedParamsDTO,
} from "@edu-platform/common";
import { StudentOutput } from "@domain/entities";

export interface IStudentOutputsRepository extends IAbstractRepository {
  findStudentOutputByActivityId: (
    activityId: string,
    studentEmail: string
  ) => Promise<StudentOutput | null>;
  findStudentOutputById: (
    studentOutputId: string
  ) => Promise<StudentOutput | null>;
}

export interface IStudentOutputsReadRepository {
  getStudentOutputById: (
    studentOutputId: string
  ) => Promise<GetStudentOutputByIdResponseBody>;
}
