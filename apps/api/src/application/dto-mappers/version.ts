import { ActivityVersion, VersionStatus } from "@domain";
import { DomainDtoMapper } from "./types";
import { VersionDTO, parseVersionStatus } from "@edu-platform/common";
import { QuestionDtoMapper, ContentDtoMapper } from ".";

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
    const dto: VersionDTO = {
      id: domain.id,
      status: domain.status,
      title: domain.title,
      description: domain.description,
      topics: domain.topics,
      version: domain.version,
      activityId: domain.activityId,
      elements: domain.elements.map((element) => ({
        content: element.content && ContentDtoMapper.mapToDto(element.content),
        question:
          element.question && QuestionDtoMapper.mapToDto(element.question),
      })),
    };
    return dto;
  },
};