import { activitiesBlocks } from '../schema';
import { ActivityBlock } from 'domain/entities';
import {
  ChangeEventsTree,
  ChangeTrackingProxy,
} from '@edu-platform/common/platform';

export class ActivityBlockSerializer {
  static serialize = (domain: ActivityBlock) => {
    const dto: typeof activitiesBlocks.$inferInsert = {
      id: domain.id,
      type: domain.type,
      data: domain.data,
    };

    return dto;
  };

  static deserialize(dto: typeof activitiesBlocks.$inferSelect) {
    const activity = new ActivityBlock();

    activity.id = dto.id;
    activity.type = dto.type;
    activity.data = dto.data;

    const proxiedEntity = new ChangeTrackingProxy(activity) as ActivityBlock;

    return proxiedEntity;
  }
}
