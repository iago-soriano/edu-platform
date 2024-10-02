import { activities } from '../schema';
import { Activity } from 'domain/entities';
import {
  ChangeEventsTree,
  ChangeTrackingProxy,
} from '@edu-platform/common/platform';

export class ActivitySerializer {
  static serialize = (domain: Activity) => {
    const dto: typeof activities.$inferInsert = {
      id: domain.id,
      requestingUserId: domain.requestingUserId,
      language: domain.language,
      topics: domain.topics,
      format: domain.format,
      level: domain.level,
      status: domain.status,
    };

    return dto;
  };

  static deserialize(dto: typeof activities.$inferSelect) {
    const activity = new Activity();

    activity.id = dto.id;
    activity.requestingUserId = dto.requestingUserId;
    activity.language = dto.language;
    activity.topics = dto.topics;
    activity.format = dto.format;
    activity.level = dto.level;
    activity.status = dto.status;

    const proxiedEntity = new ChangeTrackingProxy(activity) as Activity;

    return proxiedEntity;
  }
}
