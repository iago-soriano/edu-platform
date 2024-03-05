import { ActivityVersion, Collection, VersionStatus } from "@domain";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesReadRepository,
} from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId?: number;
};

type Return = {
  [collectionId: number]: {
    activities: {
      activityId: number;
      [VersionStatus.Published]?: ActivityVersion;
    }[];
    collection: Collection;
  };
};

export type IListActivityVersionsByParticipationUseCase = IUseCase<
  InputParams,
  Return
>;

class UseCase implements IListActivityVersionsByParticipationUseCase {
  constructor(private activitiesReadRepository: IActivitiesReadRepository) {}

  async execute({ user, collectionId }: InputParams) {
    const resp: Return = {};

    const resps =
      await this.activitiesReadRepository.Versions.listByCollectionParticipation(
        user.id,
        collectionId
      );

    const partialResp: {
      [collectionId: number]: {
        activities: {
          [activityId: string]: {
            [VersionStatus.Published]?: ActivityVersion;
            sortKey?: number;
          };
        };
        collection: Collection;
      };
    } = {};

    resps.forEach(({ collection, version }) => {
      if (!collection.id) return;
      const thisCollection = partialResp[collection.id];

      if (thisCollection) {
        // we've been through this collection
        const thisActivity = thisCollection?.activities[version.activity.id];
        const thisVersion = thisActivity[VersionStatus.Published];

        if (thisActivity) {
          // collection knows activity
          thisActivity[VersionStatus.Published] = version;
        } else {
          thisCollection.activities = {
            ...thisCollection.activities,
            [version.activity.id]: {
              [version.status]: version,
            },
          };
        }
      } else {
        //this is a new collection
        partialResp[collection.id] = {
          collection,
          activities: {
            [version.activity.id]: {
              [VersionStatus.Published]: version,
            },
          },
        };
      }
    });

    // order return based on latest update
    for (const collectionId in partialResp) {
      const { collection, activities } = partialResp[collectionId];
      for (const activityId in collection) {
        const activity = activities[activityId];
        const sortKey =
          activity[VersionStatus.Published]?.updatedAt.getTime() || -Infinity;
        activity.sortKey = sortKey;
      }

      resp[collectionId] = {
        activities: Object.keys(activities)
          .map((activityId) => ({
            activityId: Number(activityId),
            ...activities[activityId],
          }))
          .sort((a, b) => b.sortKey || 0 - (a.sortKey || 0)),
        collection,
      };
    }

    return resp;
  }
}

export default UseCase;
