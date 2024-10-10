import { activities, activitiesBlocks } from "../schema";
import { Activity, ActivityBlock } from "domain/entities";
import {
  ChangeEventsTree,
  ChangeTrackingProxy,
  CollectionArray,
} from "@edu-platform/common/platform";

export class ActivitySerializer {
  static serialize = (domain: Activity) => {
    const dto: typeof activities.$inferInsert = {
      id: domain.id,
      requestingUserId: domain.requestingUserId,
      activityGeneratedId: domain.activityGeneratedId,
      title: domain.title,
    };

    return dto;
  };

  static deserialize(
    dto: typeof activities.$inferSelect,
    blocksDto: (typeof activitiesBlocks.$inferSelect)[]
  ) {
    const activity = new Activity(
      dto.id,
      dto.requestingUserId,
      dto.activityGeneratedId,
      dto.title || "",
      new CollectionArray<ActivityBlock>()
    );

    activity.id = dto.id;
    activity.requestingUserId = dto.requestingUserId;
    activity.activityGeneratedId = dto.activityGeneratedId;
    activity.title = dto.title || "";

    const proxiedEntity = new ChangeTrackingProxy(activity) as Activity;

    return proxiedEntity;
  }
}
