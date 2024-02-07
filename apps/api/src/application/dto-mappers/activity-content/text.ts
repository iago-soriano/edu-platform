import { TextContent } from "@domain";
import { DomainDtoMapper } from "../types";
import { ContentDTO, ContentTypes } from "@edu-platform/common";

export const TextContentDtoMapper: DomainDtoMapper<TextContent, ContentDTO> = {
  mapFromDto(dto: ContentDTO) {
    const newContent = new TextContent();
    newContent.text = dto.payload?.text?.text;

    newContent.title = dto.title;
    newContent.description = dto.description;

    return newContent;
  },

  mapToDto(domain: TextContent) {
    const dto: ContentDTO = {
      id: domain.id,
      title: domain.title,
      description: domain.description,
      order: domain.order || 0,
      type: ContentTypes.Video,
      versionId: domain.versionId,
      payload: {
        text: {
          text: domain.text,
        },
      },
    };
    return dto;
  },
};
