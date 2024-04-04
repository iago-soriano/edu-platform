import {
  activities,
  activityVersions,
  activityContents,
  ActivitiesRepository,
} from "@infrastructure";
import { Activity } from "./activity";
import { ChangeTrackingProxy } from "application/domain/abstract";
import { ChangeEventsTree } from "@interfaces";
import { VersionFactory } from "@domain";

export class ActivityFactory {
  static fromDbDTOWithProxy(
    dto: typeof activities.$inferSelect,
    _events: ChangeEventsTree<typeof ActivitiesRepository.Tables>,
    draftVersionDto: typeof activityVersions.$inferSelect | null,
    lastVersionDto: typeof activityVersions.$inferSelect | null,
    draftVersionContentsDtos?: (typeof activityContents.$inferSelect | null)[],
    lastVersionContentsDtos?: (typeof activityContents.$inferSelect | null)[]
  ) {
    const activity = new Activity(dto.id);

    activity.authorId = dto.authorId;
    activity.collectionId = dto.collectionId;
    activity.isNew = false;

    activity.draftVersion =
      draftVersionDto &&
      VersionFactory.fromDbDTOWithProxy(
        draftVersionDto,
        _events,
        draftVersionContentsDtos
      );

    activity.lastVersion =
      lastVersionDto &&
      VersionFactory.fromDbDTOWithProxy(
        lastVersionDto,
        _events,
        lastVersionContentsDtos
      );

    _events[dto.id].activities = {
      ..._events[dto.id].activities,
      [dto.id]: {},
    };

    const proxiedEntity = new ChangeTrackingProxy(
      activity,
      _events[dto.id].activities[dto.id]
    ) as Activity;

    return proxiedEntity;
  }
}
