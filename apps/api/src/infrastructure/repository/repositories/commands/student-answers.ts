import { StudentAnswer } from "@domain";
import { IStudentAnswersRepository } from "@interfaces";
import { db, studentAnswers } from "@infrastructure";

export class StudentAnswersRepository implements IStudentAnswersRepository {
  async insert(answer: StudentAnswer) {
    // await db
    //   .insert(studentAnswers)
    //   .values({});
  }
}
