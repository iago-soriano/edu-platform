import { ActivityVersion, VersionStatus } from "@domain";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  statuses: VersionStatus[];
};

type Return = {
  [activityId: string]: {
    [VersionStatus.Draft]?: ActivityVersion;
    [VersionStatus.Published]?: ActivityVersion;
    [VersionStatus.Archived]?: ActivityVersion[];
  };
};

export type IListActivityVersionsUseCase = IUseCase<InputParams, Return>;

class UseCase implements IListActivityVersionsUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, statuses }: InputParams) {
    const resp: Return = {};
    const versions =
      await this.activitiesRepository.Versions.listByAuthorIdAndStatuses(
        user.id,
        statuses
      );

    versions.forEach((version) => {
      if (!!resp[version.activityId])
        resp[version.activityId] = {
          ...resp[version.activityId],
          [version.status]: version,
        };
      else
        resp[version.activityId] = {
          [version.status]: version,
        };
    });

    for (const activityId in resp) {
      const activity = resp[activityId];
      delete resp[activityId];
      const sortKey =
        activity[VersionStatus.Draft]?.updatedAt.getTime() ||
        activity[VersionStatus.Published]?.updatedAt.getTime() ||
        activity[VersionStatus.Archived]
          ?.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0]
          ?.updatedAt.getTime();
      resp[`${sortKey}-${activityId}`] = activity;
    }

    return resp;
  }
}

export default UseCase;
