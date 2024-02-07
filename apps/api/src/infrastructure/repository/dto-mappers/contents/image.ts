import { ImageContent, ContentTypes, Content } from "@domain";
import { DomainDtoMapper } from "../types";
import { activityContents } from "@infrastructure";

export const ImageContentDtoMapper: DomainDtoMapper<
  ImageContent,
  typeof activityContents
> = {
  mapFromSelectDto: (dto: typeof activityContents.$inferSelect) => {
    const domain = new ImageContent();

    domain.url = dto.imageUrl || "";

    return domain;
  },
  mapToInsertDto: (domain: ImageContent) => {
    const dto: typeof activityContents.$inferInsert = {
      title: domain.title,
      description: domain.description,
      order: domain.order,
      versionId: domain.versionId,
      imageUrl: domain.url,
      type: ContentTypes.Image,
    };

    return dto;
  },
};
