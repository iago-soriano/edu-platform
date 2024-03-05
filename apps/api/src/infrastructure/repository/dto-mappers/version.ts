import { activityVersions, activities } from "@infrastructure";
import { parseVersionStatus } from "@edu-platform/common";
import { ActivityVersion, VersionStatus, Activity } from "@domain";
import { DomainDtoMapper } from "./types";
import { ActivityDtoMapper } from ".";

export const VersionDtoMapper = {
  mapFromSelectDto: (
    dto: typeof activityVersions.$inferSelect,
    activityDto?: typeof activities.$inferSelect
  ) => {
    const version = new ActivityVersion(dto.id);

    version.id = dto.id;
    version.updatedAt = dto.updatedAt || new Date();
    version.createdAt = dto.createdAt || new Date();

    version.title = dto.title || "";
    version.description = dto.description || "";
    version.topics = dto.topics || "";
    version.version = dto.version || 0;
    version.status = parseVersionStatus(dto.status) || VersionStatus.Draft;

    version.activity = activityDto
      ? ActivityDtoMapper.mapFromSelectDto({
          ...activityDto,
        })
      : new Activity(dto.activityId || 0);

    return version;
  },

  mapToInsertDto: (domain: ActivityVersion) => {
    const dto: typeof activityVersions.$inferInsert = {
      id: domain.id,
      title: domain.title,
      description: domain.description,
      topics: domain.topics,
      version: domain.version,
      activityId: domain.activity.id,
      updatedAt: new Date(),
    };

    return dto;
  },
};
