import { StudentOutput } from "@domain/entities";
import { OutputStatus } from "@edu-platform/common/domain/domain/enums";
import { IUseCase } from "@edu-platform/common/platform";
import { createId } from "@paralleldrive/cuid2";
import { IStudentOutputsRepository } from "application/interfaces";

type InputParams = {
  blockId: string;
  answer: string;
  studentOutputId: string;
};

type Return = void;

export type IUpdateStudentOutputAnswerUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateStudentOutputAnswerUseCase {
  constructor(private studentOutputsRepository: IStudentOutputsRepository) {}

  async execute({ blockId, answer, studentOutputId }: InputParams) {
    const studentOutput =
      await this.studentOutputsRepository.findStudentOutputById(
        studentOutputId
      );

    studentOutput.updateAnswer(answer, blockId);

    await this.studentOutputsRepository.save(studentOutput);
  }
}
export default UseCase;
