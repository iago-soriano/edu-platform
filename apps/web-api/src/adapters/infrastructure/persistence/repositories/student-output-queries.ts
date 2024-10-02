import { PaginatedParamsDTO } from '@edu-platform/common';
import { db, studentOutputs } from '../schema';
import { IStudentOutputsReadRepository } from 'application/interfaces';
import { eq } from 'drizzle-orm';

export class StudentOutputReadRepository
implements IStudentOutputsReadRepository
{
  async getStudentOutputById({
    studentOutputId,
    page,
    pageSize,
  }: { studentOutputId: string } & PaginatedParamsDTO) {}
}
