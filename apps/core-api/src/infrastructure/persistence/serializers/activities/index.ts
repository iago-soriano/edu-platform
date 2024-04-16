import {
  activities,
  activityContents,
  activityQuestions,
  activityVersions,
} from "../../schema";
import { Activity } from "@domain/entities";
import {
  ChangeEventsTree,
  ChangeTrackingProxy,
} from "@edu-platform/common/platform";
import { ActivityVersionSerializer } from "./versions";
import { ActivityContentSerializer } from "./contents";
import { ActivityQuestionSerializer } from "./question";

export {
  ActivityVersionSerializer,
  ActivityContentSerializer,
  ActivityQuestionSerializer,
};
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
    draftVersionQuestionsDtos?: (
      | typeof activityQuestions.$inferSelect
      | null
    )[],
    lastVersionContentsDtos?: (typeof activityContents.$inferSelect | null)[],
    lastVersionQuestionsDtos?: (typeof activityQuestions.$inferSelect | null)[]
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
        draftVersionContentsDtos,
        draftVersionQuestionsDtos
      );

    activity.lastVersion =
      lastVersionDto &&
      ActivityVersionSerializer.deserialize(
        lastVersionDto,
        _events,
        lastVersionContentsDtos,
        lastVersionQuestionsDtos
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
