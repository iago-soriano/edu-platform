import { StudentAnswer } from "@domain";
import { IStudentAnswersRepository } from "@interfaces";
import { StudentAnswerDtoMapper } from "../dto-mappers";
import { db, studentAnswer } from "@infrastructure";

export class StudentAnswersRepository implements IStudentAnswersRepository {
  async insert(answer: StudentAnswer) {
    const dto = StudentAnswerDtoMapper.mapToInsertDto(answer);

    await db.insert(studentAnswer).values(dto);
  }
}
