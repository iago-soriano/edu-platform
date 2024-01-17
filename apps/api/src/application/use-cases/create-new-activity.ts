import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
};

type Return = {
  activityId?: number;
  versionId?: number;
};

export type ICreateNewActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewActivityUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user }: InputParams) {
    const { activityId } = await this.activitiesRepository.Activities.insert(
      user.id
    );

    const { versionId } =
      await this.activitiesRepository.Versions.insert(activityId);

    return { activityId, versionId };
  }
}

export default UseCase;
