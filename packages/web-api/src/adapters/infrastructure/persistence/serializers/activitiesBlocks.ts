import { activitiesBlocks } from "../schema";
import { ActivityBlock } from "domain/entities";
import {
  ChangeEventsTree,
  ChangeTrackingProxy,
} from "@edu-platform/common/platform";
import { ActivityBlockType } from "@edu-platform/common/domain/enums";

export class ActivityBlockSerializer {
  static serialize = (domain: ActivityBlock) => {
    const dto: typeof activitiesBlocks.$inferInsert = {
      id: domain.id,
      activityGeneratedId: domain.activityGeneratedId,
      activityId: domain.activityId,
      type: domain.type,
      data: domain.data,
    };

    return dto;
  };

  static deserialize(dto: typeof activitiesBlocks.$inferSelect) {
    const block = new ActivityBlock(
      dto.id,
      dto.type as ActivityBlockType,
      dto.data,
      dto.activityGeneratedId,
      dto.activityId
    );

    block.isNew = false;
    block.isDelete = false;

    const proxiedEntity = new ChangeTrackingProxy(block) as ActivityBlock;

    return proxiedEntity;
  }
}
