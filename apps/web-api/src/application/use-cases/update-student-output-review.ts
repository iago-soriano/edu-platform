import { OutputStatus } from "@edu-platform/common/domain/enums";
import { IUseCase } from "@edu-platform/common/platform";
import { EmailService } from "@edu-platform/common/platform/services";
import { IStudentOutputsRepository } from "application/interfaces";

type InputParams = {
  newReviews: { review: string; blockId: string }[];
  studentOutputId: string;
};

type Return = void;

export type IUpdateStudentOutputReviewUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateStudentOutputReviewUseCase {
  constructor(
    private studentOutputsRepository: IStudentOutputsRepository,
    private emailService: EmailService
  ) {}

  async execute({ newReviews, studentOutputId }: InputParams) {
    const studentOutput =
      await this.studentOutputsRepository.findStudentOutputById(
        studentOutputId
      );

    if (studentOutput.status !== OutputStatus.READY)
      throw new Error("Student Output not ready");

    studentOutput.updateReviews(newReviews);

    await this.emailService.sendOutputReviewToStudent(
      studentOutput.studentEmail
    );

    await this.studentOutputsRepository.save(studentOutput);
  }
}
export default UseCase;
