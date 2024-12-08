import { StudentOutput } from "@domain/entities";
import { OutputStatus } from "@edu-platform/common/domain/enums";
import { IUseCase } from "@edu-platform/common/platform";
import { EmailService } from "@edu-platform/common/platform/services";
import { createId } from "@paralleldrive/cuid2";
import {
  IStudentOutputsRepository,
  IUserRepository,
} from "application/interfaces";

type InputParams = {
  answers: { answer: string; blockId: string }[];
  studentOutputId: string;
};

type Return = void;

export type IUpdateStudentOutputAnswerUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateStudentOutputAnswerUseCase {
  constructor(
    private studentOutputsRepository: IStudentOutputsRepository,
    private userRepository: IUserRepository,
    private emailService: EmailService
  ) {}

  async execute({ answers, studentOutputId }: InputParams) {
    const studentOutput =
      await this.studentOutputsRepository.findStudentOutputById(
        studentOutputId
      );

    if (!studentOutput) throw new Error("Student Output not found");

    studentOutput.updateAnswers(answers);
    studentOutput.status = OutputStatus.READY;

    // get teacher from repo using this id, send him e-mail
    const teacher = await this.userRepository.getByEmail(
      studentOutput.reviewerEmail
    );
    if (!teacher) throw new Error("Requesting user not found");

    await this.emailService.sendStudentOutputLinkToTeacher(teacher!.email);

    await this.studentOutputsRepository.save(studentOutput);
  }
}
export default UseCase;
