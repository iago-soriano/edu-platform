import {
  ITopicsRepository,
  IActivitiesRepository,
} from "./../../interfaces/repositories";
import { IUseCase, UserSelectDTO } from "@interfaces";
import { Activity } from "@domain";

type InputParams = {
  title: string;
  description: string;
  topicIds: number[];
  activityId?: number;
  user: UserSelectDTO;
};

type Return = {
  activityId?: number;
  versionId?: number;
};

export type ISaveActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveActivityUseCase {
  constructor(
    private topicsRepository: ITopicsRepository,
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute({
    title,
    description,
    topicIds,
    activityId: requestActivityId,
    user,
  }: InputParams) {
    const topics = await this.topicsRepository.findAllOrThrow(topicIds);
    const activity = new Activity(title, description, topics);

    if (requestActivityId) {
      // editing metadata of an existing activity
      const existingActivity =
        await this.activitiesRepository.getActivityById(requestActivityId);
      if (!existingActivity) throw new Error("Activity not found");

      await this.activitiesRepository.updateActivity(
        requestActivityId,
        {
          title: activity.title,
          description: activity.description,
        },
        topics.map(({ id }) => id)
      );

      return {};
    }

    const { activityId, versionId } =
      await this.activitiesRepository.insertActivityAndNewVersion(
        {
          title: activity.title,
          description: activity.description,
          authorId: user.id,
        },
        topics.map(({ id }) => id)
      );

    return { activityId, versionId };
  }
}

export default UseCase;
