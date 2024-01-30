import { VideoContent } from "@domain";
import { DomainDtoMapper } from "../types";
import { activityContents } from "@infrastructure";

export const VideoContentDtoMapper: DomainDtoMapper<
  VideoContent,
  typeof activityContents
> = {
  mapFromSelectDto: (dto: typeof activityContents.$inferSelect) => {
    const domain = new VideoContent();
    return domain;
  },
  maptoInsertDto: (domain: VideoContent) => {
    const dto: typeof activityContents.$inferInsert = {};
    return dto;
  },
};