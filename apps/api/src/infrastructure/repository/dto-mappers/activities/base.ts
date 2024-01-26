import {
  ContentDTO,
  ContentTypes,
  ContentTypeNotFound,
} from "@edu-platform/common";
import { db, activityContents } from "@infrastructure";
import { Content, VideoContent, TextContent, ImageContent } from "@domain";
import { DomainDtoMapper } from "../types";
import { VideoContentDtoMapper } from "./video";
import { TextContentDtoMapper } from "./video";
import { ImageContentDtoMapper } from "./video";

export const ContentDtoMapper: DomainDtoMapper<
  Content,
  typeof activityContents
> = {
  mapFromSelectDto: (dto: typeof activityContents.$inferSelect) => {
    let newContent = null;

    // instanciate specific type and map payload
    switch (dto.type) {
      case ContentTypes.Video:
        newContent = VideoContentDtoMapper.mapFromSelectDto(dto);
        break;
      case ContentTypes.Image:
        newContent = ImageContentDtoMapper.mapFromSelectDto(dto);
        break;
      case ContentTypes.Text:
        newContent = TextContentDtoMapper.mapFromSelectDto(dto);
        break;
      default:
        throw new ContentTypeNotFound();
    }

    newContent.order = dto.order;
    newContent.id = dto.id;
    newContent.versionId = dto.versionId;

    return newContent;
  },

  maptoInsertDto: (domain: VideoContent | ImageContent | TextContent) => {
    if (domain instanceof VideoContent)
      return VideoContentDtoMapper.maptoInsertDto(domain);
    if (domain instanceof ImageContent)
      return ImageContentDtoMapper.maptoInsertDto(domain);
    if (domain instanceof TextContent)
      return TextContentDtoMapper.maptoInsertDto(domain);

    throw new ContentTypeNotFound();
  },
};
