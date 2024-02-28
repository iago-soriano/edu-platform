import { StudentOutput } from "@domain";

export interface IStudentOutputsRepository {
  insert: (output: StudentOutput) => Promise<{ outputId: number }>;
  getById: (outputId: number) => Promise<StudentOutput>;
}
