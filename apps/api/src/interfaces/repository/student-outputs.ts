import { StudentOutput } from "@domain";

export interface IStudentOutputsRepository {
  create: (output: StudentOutput) => Promise<{ outputId: number }>;
}
