import { activitiesGenerated, activitiesBlocks } from "../schema";
import { ActivityGenerated } from "domain/entities";
import {
  ChangeEventsTree,
  ChangeTrackingProxy,
} from "@edu-platform/common/platform";
import {
  ActivityLevel,
  ActivityStatus,
  ActivityType,
  Languages,
} from "@edu-platform/common/domain/domain/enums";

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
      activityDto.topics,
      activityDto.type as ActivityType,
      activityDto.level as ActivityLevel,
      activityDto.status as ActivityStatus
    );

    const proxiedEntity = new ChangeTrackingProxy(
      activity
    ) as ActivityGenerated;

    return proxiedEntity;
  }
}
