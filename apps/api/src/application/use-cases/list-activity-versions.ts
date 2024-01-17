import { parseToVersionDTO } from "./../dto/version";
import { Activity, VersionStatus } from "@domain";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";
import { VersionDTO, parseVersionStatus } from "@dto";

type InputParams = {
  user: UserSelectDTO;
  statuses: VersionStatus[];
};

type Return = VersionDTO[];

export type IListActivityVersionsUseCase = IUseCase<InputParams, Return>;

class UseCase implements IListActivityVersionsUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, statuses }: InputParams) {
    // const validStatuses = Activity.validateStatuses(statuses);

    const activitiesByAuthor = (
      await this.activitiesRepository.Versions.listByAuthorIdAndStatuses(
        user.id,
        statuses
      )
    ).map((ac) => {
      return {
        title: ac.title || "",
        description: ac.description || "",
        updatedAt: ac.updatedAt || new Date(),
        status: parseVersionStatus(ac.status) || VersionStatus.Draft,
        id: ac.id || 0,
        activityId: ac.activityId || 0,
      };
    });

    return activitiesByAuthor;
  }
}

export default UseCase;
