import { activityVersions } from "@infrastructure";
import { parseVersionStatus } from "@edu-platform/common";
import { ActivityVersion, VersionStatus, Activity } from "@domain";
import { DomainDtoMapper } from "./types";

export const VersionDtoMapper: DomainDtoMapper<
  ActivityVersion,
  typeof activityVersions
> = {
  mapFromSelectDto: (dto: typeof activityVersions.$inferSelect) => {
    // if (!dto) return null;

    const version = new ActivityVersion(dto.id);

    version.id = dto.id || 0;
    version.title = dto.title || "";
    version.updatedAt = dto.updatedAt || new Date();
    version.description = dto.description || "";
    version.topics = dto.topics || "";
    version.version = dto.version || 0;
    version.status = parseVersionStatus(dto.status) || VersionStatus.Draft;
    version.activity = new Activity(dto.activityId || 0);

    return version;
  },

  mapToInsertDto: (domain: ActivityVersion) => {
    const dto: typeof activityVersions.$inferInsert = {
      ...domain,
    };

    return dto;
  },
};
