import { ContentTypes, ContentTypeNotFound } from "@edu-platform/common";
import { activityContents, activityVersions } from "@infrastructure";
import {
  Content,
  VideoContent,
  TextContent,
  ImageContent,
  ActivityVersion,
} from "@domain";
import { DomainDtoMapper } from "../types";
import { VideoContentDtoMapper } from "./video";
import { TextContentDtoMapper } from "./text";
import { ImageContentDtoMapper } from "./image";
import { VersionDtoMapper } from "..";

export const ContentDtoMapper = {
  mapFromSelectDto: (
    dto: typeof activityContents.$inferSelect,
    versionDto?: typeof activityVersions.$inferSelect
  ) => {
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

    newContent!.id = dto.id;
    newContent.version = versionDto
      ? VersionDtoMapper.mapFromSelectDto({
          ...versionDto,
        })
      : new ActivityVersion(dto.versionId || 0);

    newContent!.title = dto.title || "";
    newContent!.description = dto.description || "";
    newContent!.order = dto.order || 0;

    return newContent;
  },

  mapToInsertDto: (domain: Content) => {
    let content: typeof activityContents.$inferInsert = {};

    if (domain instanceof VideoContent)
      content = VideoContentDtoMapper.mapToInsertDto(domain);
    else if (domain instanceof ImageContent)
      content = ImageContentDtoMapper.mapToInsertDto(domain);
    else if (domain instanceof TextContent)
      content = TextContentDtoMapper.mapToInsertDto(domain);
    else throw new ContentTypeNotFound();

    content.updatedAt = new Date();

    return content;
  },
};
