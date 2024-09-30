import { StudentOutput } from "./student-output";
import { StudentAnswer } from "./student-answer";
import { Question } from "../activities";

export class StudentAnswerFactory {
  static from(
    studentOutput: StudentOutput,
    question: Question,
    answer: string
  ) {
    const studentAnswer = new StudentAnswer();

    studentAnswer.questionId = question.id as number;
    studentAnswer.studentOutputId = studentOutput.id;
    studentAnswer.answer = answer;

    return studentAnswer;
  }
}
