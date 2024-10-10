import { Answer, StudentOutput } from "@domain/entities";
import { OutputStatus } from "@edu-platform/common/domain/domain/enums";
import { IUseCase } from "@edu-platform/common/platform";
import { createId } from "@paralleldrive/cuid2";
import {
  IActivitiesReadRepository,
  IStudentOutputsRepository,
} from "application/interfaces";

type InputParams = {
  activityId: string;
  userId: string;
  studentEmail: string;
};

type Return = void;

export type ICreateNewStudentOutputUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewStudentOutputUseCase {
  constructor(
    private studentOutputsRepository: IStudentOutputsRepository,
    private activitiesReadRepository: IActivitiesReadRepository
  ) {}

  async execute({ activityId, userId, studentEmail }: InputParams) {
    const existingStudentOutput =
      this.studentOutputsRepository.findStudentOutputByActivityId(
        activityId,
        studentEmail
      );

    if (!existingStudentOutput) {
      const activity =
        await this.activitiesReadRepository.getActivityById(activityId);

      const answersArray = activity?.activityGenerated.activityBlocks.map(
        (block) =>
          ({
            id: createId(),
            blockId: block.id,
            answer: "",
            review: "",
          }) as Answer
      );

      const newOutput = new StudentOutput(
        createId(),
        userId,
        activityId,
        studentEmail,
        OutputStatus.PENDING,
        answersArray
      );

      await this.studentOutputsRepository.save(newOutput);
    }
  }
}
export default UseCase;
