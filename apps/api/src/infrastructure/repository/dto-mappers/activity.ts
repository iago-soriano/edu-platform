import {
  activities,
  collections,
  activityVersions,
  users,
} from "@infrastructure";
import { Activity, ActivityVersion, Collection, User } from "@domain";
import { DomainDtoMapper } from "./types";
import { CollectionDtoMapper, VersionDtoMapper } from ".";

export const ActivityDtoMapper = {
  mapFromSelectDto: (
    dto: typeof activities.$inferSelect,
    draftVersionDto?: typeof activityVersions.$inferSelect,
    lastVersionDto?: typeof activityVersions.$inferSelect,
    collectionDto?: typeof collections.$inferSelect,
    authorDto?: typeof users.$inferSelect
  ) => {
    const activity = new Activity();
    activity.id = dto.id!;

    activity.author = new User(dto.authorId || 0);
    if (dto.draftVersionId) {
      if (draftVersionDto)
        activity.draftVersion = VersionDtoMapper.mapFromSelectDto({
          ...draftVersionDto,
        });
      else activity.draftVersion = new ActivityVersion(dto.draftVersionId);
    }
    if (dto.lastVersionId) {
      if (lastVersionDto)
        activity.lastVersion = VersionDtoMapper.mapFromSelectDto({
          ...lastVersionDto,
        });
      else activity.lastVersion = new ActivityVersion(dto.lastVersionId);
    }

    activity.collection = collectionDto
      ? CollectionDtoMapper.mapFromSelectDto({
          ...collectionDto,
        })
      : new Collection(dto.collectionId || 0);

    return activity;
  },

  mapToInsertDto: (domain: Activity) => {
    const dto: typeof activities.$inferInsert = {
      id: domain.id,
      authorId: domain.author?.id,
      draftVersionId: domain.draftVersion?.id || null,
      lastVersionId: domain.lastVersion?.id || null,
      updatedAt: new Date(),
      collectionId: domain.collection?.id,
    };

    return dto;
  },
};
