import { activityContents, activityVersions } from "@infrastructure";
import { ChangeTrackingProxy, ActivityVersion } from "@domain";
import { ChangeEventsTree } from "@interfaces";
import { ActivityContentSerializer } from "./contents";
import { parseVersionStatus } from "@edu-platform/common";

export class ActivityVersionSerializer {
  static serialize(domain: ActivityVersion) {
    const dto: typeof activityVersions.$inferInsert = {
      id: domain.id,
      title: domain.title.toString(),
      description: domain.description.toString(),
      topics: domain.topics.toString(),
      version: domain.version,
      activityId: domain.activityId,
    };

    return dto;
  }

  static deserialize(
    dto: typeof activityVersions.$inferSelect,
    _events: ChangeEventsTree,
    contentsDtos?: (typeof activityContents.$inferSelect | null)[]
  ) {
    const version = new ActivityVersion(
      dto.id,
      dto.title,
      dto.description,
      dto.topics,
      dto.version,
      parseVersionStatus(dto.status)
    );

    version.isNew = false;
    version.activityId = dto.activityId;

    if (contentsDtos) {
      for (let content of contentsDtos) {
        version.elements.push(
          ActivityContentSerializer.deserialize(
            content!,
            _events[dto.activityId]
          )
        );
      }
    }

    _events[dto.activityId].ActivityVersion = {
      ..._events[dto.activityId].ActivityVersion,
      [version.id]: {},
    };

    const proxiedEntity = new ChangeTrackingProxy(
      version,
      _events[dto.activityId].ActivityVersion[version.id]
    ) as ActivityVersion;

    return proxiedEntity;
  }
}
