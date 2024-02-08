import { ImageContent } from "@domain";
import { DomainDtoMapper } from "../types";
import { ContentDTO, ContentTypes } from "@edu-platform/common";

export const ImageContentDtoMapper: DomainDtoMapper<ImageContent, ContentDTO> =
  {
    mapFromDto(dto: ContentDTO) {
      const newContent = new ImageContent();

      newContent.url = dto.payload?.image?.url;
      newContent.file = dto.payload?.image?.file || null;

      newContent.title = dto.title;
      newContent.description = dto.description;

      return newContent;
    },

    mapToDto(domain: ImageContent) {
      const dto: ContentDTO = {
        id: domain.id,
        title: domain.title,
        description: domain.description,
        order: domain.order || 0,
        type: ContentTypes.Image,
        versionId: domain.versionId,
        payload: {
          image: {
            url: domain.url,
          },
        },
      };
      return dto;
    },
  };
