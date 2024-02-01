import { activities } from "@infrastructure";
import { Activity } from "@domain";
import { DomainDtoMapper } from "./types";

export const ActivityDtoMapper: DomainDtoMapper<Activity, typeof activities> = {
  mapFromSelectDto: (dto: typeof activities.$inferSelect) => {
    const activity = new Activity();

    activity.authorId = dto.authorId || 0;
    activity.draftVersionId = dto.draftVersionId || 0;
    activity.id = dto.id;
    activity.lastVersionId = dto.lastVersionId || 0;

    return activity;
  },

  mapToInsertDto: (domain: Activity) => {
    return domain;
  },
};
