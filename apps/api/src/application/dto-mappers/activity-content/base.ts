import {
  ContentRequestDTO,
  ContentResponseDTO,
  VersionResponseDTO,
  ContentTypes,
  ContentTypeNotFound,
} from "@edu-platform/common";
import {
  VideoContent,
  ImageContent,
  TextContent,
  Content,
  ActivityVersion,
} from "@domain";
import { DomainDtoMapper } from "../types";
import { VideoContentDtoMapper } from "./video";
import { ImageContentDtoMapper } from "./image";
import { TextContentDtoMapper } from "./text";

export const ContentDtoMapper: DomainDtoMapper<
  Content,
  ContentRequestDTO,
  ContentResponseDTO
> = {
  mapFromDto: (
    dto: ContentRequestDTO,
    versionDto: Partial<VersionResponseDTO>
  ) => {
    let newContent = null;

    // instanciate specific type and map payload
    switch (dto.type) {
      case ContentTypes.Video:
        newContent = VideoContentDtoMapper.mapFromDto(dto);
        break;
      case ContentTypes.Image:
        newContent = ImageContentDtoMapper.mapFromDto(dto);
        break;
      case ContentTypes.Text:
        newContent = TextContentDtoMapper.mapFromDto(dto);
        break;
      default:
        throw new ContentTypeNotFound();
    }

    newContent.order = dto.order;
    newContent.id = dto.id;

    const version = new ActivityVersion();
    version.id = versionDto.id || 0;

    return newContent;
  },

  mapToDto: (domain: Content) => {
    if (domain instanceof VideoContent)
      return VideoContentDtoMapper.mapToDto(domain);
    if (domain instanceof ImageContent)
      return ImageContentDtoMapper.mapToDto(domain);
    if (domain instanceof TextContent)
      return TextContentDtoMapper.mapToDto(domain);

    throw new ContentTypeNotFound();
  },
};
