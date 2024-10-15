import { activitiesGenerated, activitiesBlocks } from "../schema";
import { ActivityGenerated, ActivityBlock } from "domain/entities";
import {
  CollectionArray,
  ChangeTrackingProxy,
} from "@edu-platform/common/platform";
import {
  ActivityLevel,
  ActivityStatus,
  ActivityTopics,
  ActivityType,
  Languages,
} from "@edu-platform/common/domain/enums";
import { ActivityBlockSerializer } from "./activitiesBlocks";

export class ActivityGeneratedSerializer {
  static serialize = (domain: ActivityGenerated) => {
    const dto: typeof activitiesGenerated.$inferInsert = {
      id: domain.id,
      language: domain.language,
      topics: domain.topics,
      type: domain.type,
      level: domain.level,
      status: domain.status,
    };

    return dto;
  };

  static deserialize(
    activityDto: typeof activitiesGenerated.$inferSelect,
    blocksDto?: (typeof activitiesBlocks.$inferSelect)[]
  ) {
    const activity = new ActivityGenerated(
      activityDto.id,
      activityDto.language as Languages,
      activityDto.topics as ActivityTopics[],
      activityDto.type as ActivityType,
      activityDto.level as ActivityLevel,
      activityDto.status as ActivityStatus,
      new CollectionArray<ActivityBlock>(
        ...(blocksDto?.map((dto) => ActivityBlockSerializer.deserialize(dto)) ??
          [])
      )
    );

    activity.isNew = false;
    activity.isDelete = false;

    const proxiedEntity = new ChangeTrackingProxy(
      activity
    ) as ActivityGenerated;

    return proxiedEntity;
  }
}
