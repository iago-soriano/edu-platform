import {
  IUseCase,
  ISQSService,
  CollectionArray,
} from "@edu-platform/common/platform";
import { GenerateActivityGPTEvent } from "@edu-platform/common/domain";
import { IActivitiesGeneratedRepository, IUserRepository } from "../interfaces";
import { ActivityBlock, ActivityGenerated } from "@domain/entities";
import { createId } from "@paralleldrive/cuid2";
import {
  ActivityStatus,
  ActivityType,
  ActivityLevel,
  Languages,
  ActivityTopics,
} from "@edu-platform/common/domain/enums";

type InputParams = {
  language: Languages;
  topics: ActivityTopics[];
  type: ActivityType;
  level: ActivityLevel;
  userId: string;
};

type Return = {
  id: string;
  status: ActivityStatus;
};

export type ICreateNewGeneratedActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewGeneratedActivityUseCase {
  constructor(
    private activitiesGeneratedRepository: IActivitiesGeneratedRepository,
    private userRepository: IUserRepository,
    private sqsService: ISQSService
  ) {}

  async execute({ language, topics, type, level, userId }: InputParams) {
    const user = await this.userRepository.getById(userId);

    if (!user) throw new Error("User not found");

    const baseActivity =
      await this.activitiesGeneratedRepository.findGeneratedActivityByParams(
        language,
        topics,
        type,
        level
      );

    if (!baseActivity) {
      const newId = createId();
      const newActivity = new ActivityGenerated(
        newId,
        language as Languages,
        topics,
        type as ActivityType,
        level as ActivityLevel,
        ActivityStatus.PENDING,
        new CollectionArray<ActivityBlock>()
      );

      const created =
        await this.activitiesGeneratedRepository.save(newActivity);

      await this.sqsService.send(
        new GenerateActivityGPTEvent(created.ActivityGeneratedId)
      );

      return { id: newId, status: ActivityStatus.PENDING };
    }

    return { id: baseActivity.id, status: baseActivity.status };
  }
}

export default UseCase;
