import { ImageContent, ActivityVersion } from "@domain";
import { DomainDtoMapper } from "../types";
import {
  ContentRequestDTO,
  ContentResponseDTO,
  ContentTypes,
} from "@edu-platform/common";

export const ImageContentDtoMapper: DomainDtoMapper<
  ImageContent,
  ContentRequestDTO,
  ContentResponseDTO
> = {
  mapFromDto(dto: ContentRequestDTO) {
    const newContent = new ImageContent();

    newContent.url = dto.payload?.image?.url;
    newContent.file = dto.payload?.image?.file || null;

    newContent.title = dto.title;
    newContent.description = dto.description;

    return newContent;
  },

  mapToDto(domain: ImageContent) {
    const dto: ContentResponseDTO = {
      id: domain.id,
      createdAt: domain.createdAt || new Date(),
      updatedAt: domain.updatedAt || new Date(),

      title: domain.title || "",
      description: domain.description || "",
      order: domain.order || 0,
      type: ContentTypes.Image,
      versionId: domain.version.id!,
      payload: {
        image: {
          url: domain.url,
        },
      },
    };
    return dto;
  },
};
