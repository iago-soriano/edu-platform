import { IActivitiesRepository, IUseCase } from "@interfaces";
import { Activity } from "application/domain/activity";

type InputParams = {
  activityId: number;
  activityStatus: string;
};

type Return = void;

export type IUpdateActivityStatusUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateActivityStatusUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ activityId, activityStatus }: InputParams) {
    const validStatus = Activity.validateStatus(activityStatus);

    if (validStatus) {
      await this.activitiesRepository.updateActivity(activityId, {
        status: validStatus,
      });
    }
  }
}

export default UseCase;
