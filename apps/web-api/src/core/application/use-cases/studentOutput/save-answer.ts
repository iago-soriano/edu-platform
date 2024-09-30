import { Question, StudentAnswer, OutputStatus } from "@core/domain/entities";
import { IUseCase } from "@edu-platform/common/platform";
import {
  UserSelectDTO,
  IStudentOutputsRepository,
  IActivitiesRepository,
} from "../../interfaces";
import { SilentInvalidStateError } from "@edu-platform/common";

type InputParams = {
  user: UserSelectDTO;
  studentOutputId: number;
  questionId: number;
  answer: string;
  answerId?: number;
};

type Return = void;

export type ISaveAnswerUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveAnswerUseCase {
  constructor(
    private studentOutputsRepository: IStudentOutputsRepository,
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute({
    user,
    studentOutputId,
    questionId,
    answer,
    answerId,
  }: InputParams) {
    const output =
      await this.studentOutputsRepository.findById(studentOutputId);
      
    if (!output) throw new SilentInvalidStateError("Student Output not found");
    if (output.studentId !== user.id)
      throw new SilentInvalidStateError("Student is not output author");

    const activity = await this.activitiesRepository.findRootByIdWithElements(
      output.activityId
    );

    if (!activity) throw new SilentInvalidStateError("Activity not found");

    output.upsertAnswer(activity, questionId, {
      text: answer,
      id: answerId,
    });

    await this.studentOutputsRepository.save(output);
  }
}
export default UseCase;
