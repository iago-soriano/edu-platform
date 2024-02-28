import { activities } from "@infrastructure";
import { Activity, ActivityVersion, Collection, User } from "@domain";
import { DomainDtoMapper } from "./types";

export const ActivityDtoMapper: DomainDtoMapper<Activity, typeof activities> = {
  mapFromSelectDto: (dto: typeof activities.$inferSelect) => {
    const activity = new Activity();

    activity.author = new User(dto.authorId || 0);
    activity.draftVersion = dto.draftVersionId
      ? new ActivityVersion(dto.draftVersionId)
      : undefined;
    activity.id = dto.id;
    activity.lastVersion = dto.lastVersionId
      ? new ActivityVersion(dto.lastVersionId)
      : undefined;
    activity.collection = new Collection(dto.collectionId);

    return activity;
  },

  mapToInsertDto: (domain: Activity) => {
    const dto: typeof activities.$inferInsert = {
      authorId: domain.author?.id,
      draftVersionId: domain.draftVersion?.id,
      lastVersionId: domain.lastVersion?.id,
      updatedAt: new Date(),
      collectionId: domain.collection?.id,
    };

    return dto;
  },
};
