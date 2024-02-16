import { TextContent, ContentTypes } from "@domain";
import { DomainDtoMapper } from "../types";
import { activityContents } from "@infrastructure";

export const TextContentDtoMapper: DomainDtoMapper<
  TextContent,
  typeof activityContents
> = {
  mapFromSelectDto: (dto: typeof activityContents.$inferSelect) => {
    const domain = new TextContent();

    domain.text = dto.text || "";

    return domain;
  },
  mapToInsertDto: (domain: TextContent) => {
    const dto: typeof activityContents.$inferInsert = {
      title: domain.title,
      description: domain.description,
      order: domain.order,
      text: domain.text,
      versionId: domain.version.id,
      type: ContentTypes.Text,
    };
    return dto;
  },
};
