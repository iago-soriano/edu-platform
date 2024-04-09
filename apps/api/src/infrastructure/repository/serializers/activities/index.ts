import {
  activities,
  activityContents,
  activityVersions,
} from "@infrastructure";
import { Activity, ChangeTrackingProxy } from "@domain";
import { ChangeEventsTree } from "@interfaces";
import { ActivityVersionSerializer } from "./versions";
import { ActivityContentSerializer } from "./contents";

export { ActivityVersionSerializer, ActivityContentSerializer };
export class ActivitySerializer {
  static serialize = (domain: Activity) => {
    const dto: typeof activities.$inferInsert = {
      id: domain.id,
      authorId: domain.authorId,
      draftVersionId: domain.draftVersion?.id || null,
      lastVersionId: domain.lastVersion?.id || null,
      collectionId: domain.collectionId,
    };

    return dto;
  };

  static deserialize(
    dto: typeof activities.$inferSelect,
    _events: ChangeEventsTree,
    draftVersionDto: typeof activityVersions.$inferSelect | null,
    lastVersionDto: typeof activityVersions.$inferSelect | null,
    draftVersionContentsDtos?: (typeof activityContents.$inferSelect | null)[],
    lastVersionContentsDtos?: (typeof activityContents.$inferSelect | null)[]
  ) {
    const activity = new Activity();

    activity.id = dto.id;
    activity.authorId = dto.authorId;
    activity.collectionId = dto.collectionId;
    activity.isNew = false;

    activity.draftVersion =
      draftVersionDto &&
      ActivityVersionSerializer.deserialize(
        draftVersionDto,
        _events,
        draftVersionContentsDtos
      );

    activity.lastVersion =
      lastVersionDto &&
      ActivityVersionSerializer.deserialize(
        lastVersionDto,
        _events,
        lastVersionContentsDtos
      );

    _events[dto.id].Activity = {
      ..._events[dto.id].Activity,
      [dto.id]: {},
    };

    const proxiedEntity = new ChangeTrackingProxy(
      activity,
      _events[dto.id].Activity[dto.id]
    ) as Activity;

    return proxiedEntity;
  }
}
