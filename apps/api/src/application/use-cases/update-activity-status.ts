import { ActivityStatusNotFound } from "@edu-platform/common";
import { ActivityStatusEnum } from "@interfaces";
import { IActivitiesRepository, IUseCase } from "@interfaces";

type InputParams = {
  activityId: number;
  activityStatus: string;
};

type Return = void;

export type IUpdateActivityStatusUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateActivityStatusUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ activityId, activityStatus }: InputParams) {
    for (let status of ActivityStatusEnum) {
      if (status === activityStatus) {
        await this.activitiesRepository.updateActivity(activityId, {
          status: activityStatus,
        });
        return;
      }
    }

    throw new ActivityStatusNotFound();
  }
}

export default UseCase;
