import { StudentAnswer } from "@domain/entities";

export interface IStudentAnswersRepository {
  insert: (answer: StudentAnswer) => Promise<void>;
}
