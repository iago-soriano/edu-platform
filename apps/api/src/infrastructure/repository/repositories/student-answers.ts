import { StudentAnswer } from "@domain";
import { IStudentAnswersRepository } from "@interfaces";
import { StudentAnswerDtoMapper } from "../dto-mappers";
import { db, studentAnswers } from "@infrastructure";

export class StudentAnswersRepository implements IStudentAnswersRepository {
  async insert(answer: StudentAnswer) {
    await db
      .insert(studentAnswers)
      .values(StudentAnswerDtoMapper.mapToInsertDto(answer));
  }
}
