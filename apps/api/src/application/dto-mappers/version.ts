import { ActivityVersion, VersionStatus } from "@domain";
import { DomainDtoMapper } from "./types";
import {
  VersionResponseDTO,
  VersionRequestDTO,
  parseVersionStatus,
} from "@edu-platform/common";
import { QuestionDtoMapper, ContentDtoMapper } from ".";

export const ActivityVersionDtoMapper: DomainDtoMapper<
  ActivityVersion,
  VersionRequestDTO,
  VersionResponseDTO
> = {
  mapFromDto(dto: VersionRequestDTO) {
    const version = new ActivityVersion();

    // version.id = dto.id || 0;
    version.title = dto.title || "";
    version.description = dto.description || "";
    version.topics = dto.topics || "";
    // version.version = dto.version || 0;
    // version.status = parseVersionStatus(dto.status) || VersionStatus.Draft;
    // version.activityId = dto.activityId || 0;

    return version;
  },

  mapToDto(domain: ActivityVersion) {
    const dto: VersionResponseDTO = {
      id: domain.id,
      updatedAt: domain.updatedAt,

      status: domain.status,
      title: domain.title,
      description: domain.description,
      topics: domain.topics,
      version: domain.version,
      activityId: domain.activity.id,
      elements: domain.elements.map((element) => ({
        content: element.content && ContentDtoMapper.mapToDto(element.content),
        question:
          element.question && QuestionDtoMapper.mapToDto(element.question),
      })),
    };
    return dto;
  },
};
