import { Question, StudentAnswer, OutputStatus } from "@core/domain/entities";
import { IUseCase } from "@edu-platform/common/platform";
import { UserSelectDTO, IStudentOutputsRepository } from "../../interfaces";
import { SilentInvalidStateError } from "@edu-platform/common";

type InputParams = {
  user: UserSelectDTO;
  studentOutputId: number;
  answerId: number;
  feedbackEmoji?: string;
  feedbackText?: string;
};

type Return = void;

export type ISaveFeedbackToAnswerUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveFeedbackToAnswerUseCase {
  constructor(private studentOutputsRepository: IStudentOutputsRepository) {}

  async execute({
    user,
    studentOutputId,
    answerId,
    feedbackEmoji,
    feedbackText,
  }: InputParams) {
    const output =
      await this.studentOutputsRepository.findById(studentOutputId);
    if (!output) throw new SilentInvalidStateError("Student Output not found");

    output.FeedbackToAnswer(user.id, answerId, feedbackEmoji, feedbackText);

    await this.studentOutputsRepository.save(output);
  }
}
export default UseCase;
