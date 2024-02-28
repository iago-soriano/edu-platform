import { ActivityVersion, Collection, VersionStatus } from "@domain";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";
import { isArray } from "util";

type InputParams = {
  user: UserSelectDTO;
  collectionId?: number;
};

type Return = {
  [collectionId: number]: {
    activities: {
      activityId: number;
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
        const thisVersion = thisActivity?.[version.status];

        if (thisActivity) {
          // collection knows activity
          if (version.status !== VersionStatus.Archived)
            // if not archived, version is unique. just add it to activity
            thisActivity[version.status] = version;
          else {
            // if archived, there needs to be an array of versions
            if (thisVersion && Array.isArray(thisVersion))
              // there is a previous archived version saved
              thisVersion?.push(version);
            else thisActivity[VersionStatus.Archived] = [version]; // this is the first archived version
          }
        } else {
          thisCollection.activities = {
            ...thisCollection.activities,
            [version.activity.id]: {
              [version.status]:
                version.status === VersionStatus.Archived ? [version] : version,
            },
          };
        }
      } else {
        //this is a new collection
        partialResp[collection.id] = {
          collection,
          activities: {
            [version.activity.id]: {
              [version.status]:
                version.status === VersionStatus.Archived ? [version] : version,
            },
          },
        };
      }
    });

    // order return based on latest update
    for (const collectionId in partialResp) {
      const { collection, activities } = partialResp[collectionId];
      for (const activityId in activities) {
        const activity = activities[activityId];
        const sortKey =
          activity[VersionStatus.Draft]?.updatedAt.getTime() ||
          activity[VersionStatus.Published]?.updatedAt.getTime() ||
          activity[VersionStatus.Archived]
            ?.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0]
            ?.updatedAt.getTime() ||
          -Infinity;
        activity.sortKey = sortKey;
      }

      resp[collectionId] = {
        activities: Object.keys(activities)
          .map((activityId) => ({
            activityId: Number(activityId),
            ...activities[activityId],
          }))
          .sort((a, b) => (b.sortKey || 0) - (a.sortKey || 0)),
        collection,
      };
    }

    return resp;
  }
}

export default UseCase;
