import { ActivityVersion, VersionStatus } from "@domain";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  statuses: VersionStatus[];
};

type Return = ActivityVersion[];

export type IListActivityVersionsUseCase = IUseCase<InputParams, Return>;

class UseCase implements IListActivityVersionsUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, statuses }: InputParams) {
    return this.activitiesRepository.Versions.listByAuthorIdAndStatuses(
      user.id,
      statuses
    );
  }
}

export default UseCase;
