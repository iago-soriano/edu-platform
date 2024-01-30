import { ActivityVersion, VersionStatus } from "@domain";
import { DomainDtoMapper } from "./types";
import { VersionDTO } from "@edu-platform/common";
import { parseVersionStatus } from "@edu-platform/common";

export const ActivityVersionDtoMapper: DomainDtoMapper<
  ActivityVersion,
  VersionDTO
> = {
  mapFromDto(dto: VersionDTO) {
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

  mapToDto(domain: ActivityVersion) {
    const dto: VersionDTO = {};
    return domain;
  },
};
