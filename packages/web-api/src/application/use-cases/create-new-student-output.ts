import { Answer, StudentOutput } from "@domain/entities";
import {
  ActivityBlockType,
  OutputStatus,
} from "@edu-platform/common/domain/enums";
import { IUseCase } from "@edu-platform/common/platform";
import { createId } from "@paralleldrive/cuid2";
import {
  IActivitiesReadRepository,
  IStudentOutputsRepository,
} from "application/interfaces";

type InputParams = {
  activityId: string;
  userEmail: string;
  studentEmail: string;
};

type Return = string;

export type ICreateNewStudentOutputUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewStudentOutputUseCase {
  constructor(
    private studentOutputsRepository: IStudentOutputsRepository,
    private activitiesReadRepository: IActivitiesReadRepository
  ) {}

  async execute({ activityId, userEmail, studentEmail }: InputParams) {
    const existingStudentOutput =
      await this.studentOutputsRepository.findStudentOutputByActivityId(
        activityId,
        studentEmail
      );

    if (!existingStudentOutput) {
      const activity =
        await this.activitiesReadRepository.getMyActivityById(activityId);

      if (!activity) throw new Error("Activity not found");

      // TODO: refactor it into domain entity
      const answersArray = activity?.activity.activityBlocks
        .filter((bl) => bl.type !== ActivityBlockType.TEXT)
        .map(
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
        userEmail,
        activityId,
        studentEmail,
        OutputStatus.PENDING,
        answersArray ?? []
      );

      // TODO: send e-mail to student w/ link to student-output
      await this.studentOutputsRepository.save(newOutput);

      return newOutput.id;
    }

    return existingStudentOutput.id;
  }
}
export default UseCase;
