import { IAbstractRepository } from '@edu-platform/common/platform';
import {
  GetStudentOutputByIdResponseBody,
  PaginatedParamsDTO,
} from '@edu-platform/common';

export interface IStudentOutputsRepository extends IAbstractRepository {
  findStudentOutputById: (id: string) => Promise<void>;
}

export interface IStudentOutputsReadRepository {
  getStudentOutputById: (
    args: { studentOutputId: string } & PaginatedParamsDTO
  ) => Promise<void>;
}
