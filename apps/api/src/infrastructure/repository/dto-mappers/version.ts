import { activityVersions } from "@infrastructure";
import { parseVersionStatus } from "@edu-platform/common";
import { ActivityVersion, VersionStatus } from "@domain";
import { DomainDtoMapper } from "./types";

export const VersionDtoMapper: DomainDtoMapper<
  ActivityVersion,
  typeof activityVersions
> = {
  mapFromSelectDto: (dto: typeof activityVersions.$inferSelect) => {
    const version = new ActivityVersion();

    version.id = dto.id || 0;
    version.title = dto.title || "";
    version.updatedAt = dto.updatedAt?.toISOString() || "";
    version.description = dto.description || "";
    version.topics = dto.topics || "";
    version.version = dto.version || 0;
    version.status = parseVersionStatus(dto.status) || VersionStatus.Draft;
    version.activityId = dto.activityId || 0;

    return version;
  },

  mapToInsertDto: (domain: ActivityVersion) => {
    const dto: typeof activityVersions.$inferInsert = {};

    return dto;
  },
};
