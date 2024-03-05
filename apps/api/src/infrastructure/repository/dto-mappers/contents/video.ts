import { ContentTypes, VideoContent } from "@domain";
import { DomainDtoMapper } from "../types";
import { activityContents } from "@infrastructure";

export const VideoContentDtoMapper = {
  mapFromSelectDto: (dto: typeof activityContents.$inferSelect) => {
    const domain = new VideoContent();

    domain.url = dto.videoUrl || "";
    domain.tracks = dto.tracks || "";

    return domain;
  },
  mapToInsertDto: (domain: VideoContent) => {
    const dto: typeof activityContents.$inferInsert = {
      title: domain.title,
      description: domain.description,
      order: domain.order,
      videoUrl: domain.url,
      tracks: domain.tracks,
      versionId: domain.version.id,
      type: ContentTypes.Video,
    };

    return dto;
  },
};
