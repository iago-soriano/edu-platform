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
  newAnswers: { answer: string; blockId: string }[];
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

  async execute({ newAnswers, studentOutputId }: InputParams) {
    const studentOutput =
      await this.studentOutputsRepository.findStudentOutputById(
        studentOutputId
      );

    // update all answers
    studentOutput.updateAnswers(newAnswers);

    // set std output to READY
    studentOutput.status = OutputStatus.READY;

    // get teacher from repo using this id, send him e-mail
    const teacher = await this.userRepository.getById(
      studentOutput.requestingUserId
    );

    await this.emailService.sendStudentOutputLinkToTeacher(teacher!.email);

    await this.studentOutputsRepository.save(studentOutput);
  }
}
export default UseCase;
