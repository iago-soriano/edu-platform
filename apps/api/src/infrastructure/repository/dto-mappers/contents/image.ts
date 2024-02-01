import { ImageContent } from "@domain";
import { DomainDtoMapper } from "../types";
import { activityContents } from "@infrastructure";

export const ImageContentDtoMapper: DomainDtoMapper<
  ImageContent,
  typeof activityContents
> = {
  mapFromSelectDto: (dto: typeof activityContents.$inferSelect) => {
    const domain = new ImageContent();
    return domain;
  },
  mapToInsertDto: (domain: ImageContent) => {
    const dto: typeof activityContents.$inferInsert = {};
    return dto;
  },
};
