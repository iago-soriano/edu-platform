import { CollectionArray } from "@edu-platform/common/platform/interfaces/domain";
import { IUseCase } from "@edu-platform/common/platform";
import { IActivitiesRepository, IUserRepository } from "../interfaces";
import { Activity, ActivityBlock, User } from "@domain/entities";
import { createId } from "@paralleldrive/cuid2";
import { ActivityStatus } from "@edu-platform/common/domain/enums";
import { CreateNewActivityRequestBody } from "@edu-platform/common/api";

type InputParams = {
  generatedActivityId: string;
  blocks: CreateNewActivityRequestBody["blocks"];
  title: string;
  user: User;
};

type Return = {
  id: string;
  status: ActivityStatus;
};

export type ICreateNewActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewActivityUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({ generatedActivityId, blocks, title, user }: InputParams) {
    if (!user.canUserCreateActivities())
      throw new Error("User can't create activities.");

    const activityId = createId();

    const actBlocks = blocks.map((b) => {
      return new ActivityBlock(createId(), b.type, b.data, null, activityId);
    });

    const newActivity = new Activity(
      activityId,
      user.id,
      generatedActivityId,
      title,
      new CollectionArray<ActivityBlock>(
        ...actBlocks.map(
          (bl) =>
            new ActivityBlock(createId(), bl.type, bl.data, null, activityId)
        )
      )
    );

    const created = await this.activitiesRepository.save(newActivity);

    user.decrementCounter();
    await this.userRepository.save(user);

    // TODO: publicar no SQS
    return { id: created.id, status: created.status };
  }
}

export default UseCase;
