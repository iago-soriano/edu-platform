import { TextContent } from "@domain";
import { DomainDtoMapper } from "../types";
import { activityContents } from "@infrastructure";

export const TextContentDtoMapper: DomainDtoMapper<
  TextContent,
  typeof activityContents
> = {
  mapFromSelectDto: (dto: typeof activityContents.$inferSelect) => {
    const domain = new TextContent();
    return domain;
  },
  mapToInsertDto: (domain: TextContent) => {
    const dto: typeof activityContents.$inferInsert = {};
    return dto;
  },
};
