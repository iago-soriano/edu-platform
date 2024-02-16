import { VideoContent } from "@domain";
import { DomainDtoMapper } from "../types";
import {
  ContentRequestDTO,
  ContentResponseDTO,
  ContentTypes,
} from "@edu-platform/common";

export const VideoContentDtoMapper: DomainDtoMapper<
  VideoContent,
  ContentRequestDTO,
  ContentResponseDTO
> = {
  mapFromDto(dto: ContentRequestDTO) {
    const newContent = new VideoContent();
    newContent.tracks = dto.payload?.video?.tracks;
    newContent.url = dto.payload?.video?.url;

    newContent.title = dto.title;
    newContent.description = dto.description;

    return newContent;
  },

  mapToDto(domain: VideoContent) {
    const dto: ContentResponseDTO = {
      id: domain.id,
      createdAt: domain.createdAt || new Date(),
      updatedAt: domain.updatedAt || new Date(),

      title: domain.title || "",
      description: domain.description || "",
      order: domain.order || 0,
      type: ContentTypes.Video,
      versionId: domain.version.id,
      payload: {
        video: {
          url: domain.url,
          tracks: domain.tracks,
        },
      },
    };
    return dto;
  },
};
