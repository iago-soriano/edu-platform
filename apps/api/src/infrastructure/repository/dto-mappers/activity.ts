import { activities } from "@infrastructure";
import { Activity, ActivityVersion, User } from "@domain";
import { DomainDtoMapper } from "./types";

export const ActivityDtoMapper: DomainDtoMapper<Activity, typeof activities> = {
  mapFromSelectDto: (dto: typeof activities.$inferSelect) => {
    const activity = new Activity();

    activity.author = new User(dto.authorId || 0);
    activity.draftVersion = new ActivityVersion(dto.draftVersionId || 0);
    activity.id = dto.id;
    activity.lastVersion = new ActivityVersion(dto.lastVersionId || 0);

    return activity;
  },

  mapToInsertDto: (domain: Activity) => {
    return domain;
  },
};
