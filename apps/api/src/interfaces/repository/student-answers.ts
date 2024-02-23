import { StudentAnswer } from "@domain";

export interface IStudentAnswersRepository {
  insert: (answer: StudentAnswer) => Promise<void>;
}
