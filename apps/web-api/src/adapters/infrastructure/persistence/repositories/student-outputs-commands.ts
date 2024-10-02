import { IStudentOutputsRepository } from 'application/interfaces';
import { eq, and } from 'drizzle-orm';
import { AllTables } from './all-tables';
import { BaseRepository } from '@edu-platform/common/platform';
import { db, studentOutputs } from '../schema';
import { StudentOutputSerializer } from '../serializers/studentOutput';

export const StudentOutputEntityNames = {
  StudentOutput: AllTables['StudentOutput'],
};

export class StudentOutputsRepository
  extends BaseRepository<typeof AllTables>
  implements IStudentOutputsRepository
{
  constructor() {
    super(StudentOutputEntityNames, db);
  }

  async findStudentOutputById(id: string) {}
}
