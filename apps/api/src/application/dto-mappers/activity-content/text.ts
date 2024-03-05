import { TextContent } from "@domain";
import { DomainDtoMapper } from "../types";
import {
  ContentRequestDTO,
  ContentResponseDTO,
  ContentTypes,
} from "@edu-platform/common";

export const TextContentDtoMapper: DomainDtoMapper<
  TextContent,
  ContentRequestDTO,
  ContentResponseDTO
> = {
  mapFromDto(dto: ContentRequestDTO) {
    const newContent = new TextContent();

    newContent.text = dto.payload?.text?.text;

    newContent.title = dto.title;
    newContent.description = dto.description;

    return newContent;
  },

  mapToDto(domain: TextContent) {
    const dto: ContentResponseDTO = {
      id: domain.id,
      createdAt: domain.createdAt || new Date(),
      updatedAt: domain.updatedAt || new Date(),

      title: domain.title || "",
      description: domain.description || "",
      order: domain.order || 0,
      type: ContentTypes.Text,
      versionId: domain.version.id!,
      payload: {
        text: {
          text: domain.text,
        },
      },
    };
    return dto;
  },
};
