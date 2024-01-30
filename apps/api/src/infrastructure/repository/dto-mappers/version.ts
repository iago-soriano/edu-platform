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

    version.id || 0;
    version.title || "";
    version.description || "";
    version.topics || "";
    version.version || 0;
    version.status = parseVersionStatus(dto.status) || VersionStatus.Draft;
    version.activityId || 0;

    return version;
  },

  maptoInsertDto: (domain: ActivityVersion) => {
    return domain;
  },
};
