import { ActivityVersion, Collection, VersionStatus } from "@domain";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId?: number;
};

type Return = {
  [collectionId: number]: {
    activities: {
      activityId: string;
      [VersionStatus.Draft]?: ActivityVersion;
      [VersionStatus.Published]?: ActivityVersion;
      [VersionStatus.Archived]?: ActivityVersion[];
    }[];
    collection: Collection;
  };
};

export type IListActivityVersionsByOwnershipUseCase = IUseCase<
  InputParams,
  Return
>;

class UseCase implements IListActivityVersionsByOwnershipUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, collectionId }: InputParams) {
    const resp: Return = {};
    const resps =
      await this.activitiesRepository.Versions.listByCollectionOwnership(
        user.id,
        collectionId
      );

    const partialResp: {
      [collectionId: number]: {
        activities: {
          [activityId: string]: {
            [VersionStatus.Draft]?: ActivityVersion;
            [VersionStatus.Published]?: ActivityVersion;
            [VersionStatus.Archived]?: ActivityVersion[];
          };
        };
        collection: Collection;
      };
    } = {};
    resps.forEach(({ collection, version }) => {
      if (!collection.id) return;
      if (!!resp[collection.id]) {
        const thisCollection = resp[collection.id];
        // thisCollection.activities.
        //  = {
        //   collection: resp[collection.id].collection,
        //   activities: {
        //     ...resp[collection.id].activities,

        //   }
        // }
      } else {
      }
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
