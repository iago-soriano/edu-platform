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

    version.title = dto.title || "";
    version.description = dto.description || "";
    version.topics = dto.topics || "";

    return version;
  },

  mapToDto(domain: ActivityVersion) {
    const elements = [
      ...domain.contents.map((content) => ({
        content: ContentDtoMapper.mapToDto(content),
        question: undefined,
      })),
      ...domain.questions.map((question) => ({
        question: QuestionDtoMapper.mapToDto(question),
        content: undefined,
      })),
    ].sort(
      (el1, el2) =>
        ((el1?.content || el1?.question)?.order || 0) -
        ((el2?.content || el2?.question)?.order || 0)
    );

    const dto: VersionResponseDTO = {
      id: domain.id,
      updatedAt: domain.updatedAt,

      status: domain.status,
      title: domain.title,
      description: domain.description,
      topics: domain.topics,
      version: domain.version,
      activityId: domain.activity.id,
      elements,
    };

    return dto;
  },
};
