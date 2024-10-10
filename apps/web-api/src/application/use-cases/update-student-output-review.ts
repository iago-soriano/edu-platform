import { StudentOutput } from "@domain/entities";
import { OutputStatus } from "@edu-platform/common/domain/domain/enums";
import { IUseCase } from "@edu-platform/common/platform";
import { createId } from "@paralleldrive/cuid2";
import { IStudentOutputsRepository } from "application/interfaces";

type InputParams = {
  blockId: string;
  review: string;
  studentOutputId: string;
};

type Return = void;

export type IUpdateStudentOutputReviewUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateStudentOutputReviewUseCase {
  constructor(private studentOutputsRepository: IStudentOutputsRepository) {}

  async execute({ blockId, review, studentOutputId }: InputParams) {
    const studentOutput =
      await this.studentOutputsRepository.findStudentOutputById(
        studentOutputId
      );

    studentOutput.updateReview(review, blockId);

    await this.studentOutputsRepository.save(studentOutput);
  }
}
export default UseCase;
