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
    const { activityId, versionId } =
      await this.activitiesRepository.insertActivityAndNewVersion(user.id);

    return { activityId, versionId };
  }
}

export default UseCase;
