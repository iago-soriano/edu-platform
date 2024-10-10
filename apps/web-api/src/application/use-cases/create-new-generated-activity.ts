import { IUseCase } from "@edu-platform/common/platform";
import { IActivitiesGeneratedRepository, IUserRepository } from "../interfaces";
import { ActivityGenerated } from "@domain/entities";
import { createId } from "@paralleldrive/cuid2";
import {
  ActivityStatus,
  ActivityType,
  ActivityLevel,
  Languages,
} from "@edu-platform/common/domain/domain/enums";

type InputParams = {
  language: Languages;
  topics: string[];
  type: ActivityType;
  level: string;
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
    private userRepository: IUserRepository
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
        ActivityStatus.PENDING
      );

      const created =
        await this.activitiesGeneratedRepository.save(newActivity);

      // TODO: publicar no SQS
      return { id: newId, status: ActivityStatus.PENDING };
    }

    return { id: baseActivity.id, status: baseActivity.status };
  }
}

export default UseCase;
