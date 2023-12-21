import { IActivitiesRepository, IUseCase } from "@interfaces";
import { Activity } from "application/domain/activity";

type InputParams = {
  activityId: number;
  newActivityStatus: string;
};

type Return = void;

export type IUpdateActivityStatusUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateActivityStatusUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ activityId, newActivityStatus }: InputParams) {
    const validStatus = Activity.validateStatuses([newActivityStatus]);

    if (validStatus) {
      await this.activitiesRepository.updateActivityVersionMetadata(
        activityId,
        {
          status: validStatus[0],
        }
      );
    }
  }
}

export default UseCase;
