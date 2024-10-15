import { activities, activitiesBlocks } from "../schema";
import { Activity, ActivityBlock } from "domain/entities";
import {
  ChangeEventsTree,
  ChangeTrackingProxy,
  CollectionArray,
} from "@edu-platform/common/platform";
import { ActivityBlockSerializer } from "./activitiesBlocks";

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
    blocksDto?: (typeof activitiesBlocks.$inferSelect)[]
  ) {
    const activity = new Activity(
      dto.id,
      dto.requestingUserId,
      dto.activityGeneratedId,
      dto.title || "",
      new CollectionArray<ActivityBlock>(
        ...(blocksDto?.map((dto) => ActivityBlockSerializer.deserialize(dto)) ??
          [])
      )
    );

    const proxiedEntity = new ChangeTrackingProxy(activity) as Activity;

    return proxiedEntity;
  }
}
