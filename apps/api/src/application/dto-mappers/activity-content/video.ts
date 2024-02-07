import { VideoContent } from "@domain";
import { DomainDtoMapper } from "../types";
import { ContentDTO, ContentTypes } from "@edu-platform/common";

export const VideoContentDtoMapper: DomainDtoMapper<VideoContent, ContentDTO> =
  {
    mapFromDto(dto: ContentDTO) {
      const newContent = new VideoContent();
      newContent.tracks = dto.payload?.video?.tracks;
      newContent.url = dto.payload?.video?.url;

      newContent.title = dto.title;
      newContent.description = dto.description;

      return newContent;
    },

    mapToDto(domain: VideoContent) {
      const dto: ContentDTO = {
        id: domain.id,
        title: domain.title,
        description: domain.description,
        order: domain.order || 0,
        type: ContentTypes.Video,
        versionId: domain.versionId,
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
