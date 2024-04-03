import { Collection, VersionStatus } from "@domain";
import {
  ICollectionsRepository,
  ICollectionsReadRepository,
} from "@interfaces";
import {
  db,
  collections,
  collectionParticipations,
  activities,
  activityVersions,
} from "@infrastructure";
import { CollectionDtoMapper } from "../../dto-mappers/collection";
import { eq, sql, desc, and } from "drizzle-orm";

export class CollectionsRepository implements ICollectionsRepository {
  async insert(collection: Collection) {
    return (
      await db
        .insert(collections)
        .values(CollectionDtoMapper.mapToInsertDto(collection))
        .returning({ collectionId: collections.id })
    )[0];
  }

  async update(collection: Collection) {
    if (!collection.id) throw new Error("There must be an id to update");

    await db
      .update(collections)
      .set(CollectionDtoMapper.mapToInsertDto(collection))
      .where(eq(collections.id, collection.id));
  }

  async getById(collectionId: number) {
    const dto = (
      await db
        .select()
        .from(collections)
        .where(eq(collections.id, collectionId))
    )[0];

    if (!dto) return null;

    return CollectionDtoMapper.mapFromSelectDto(dto);
  }

  async getByIdWithActivityCount(collectionId: number) {
    //TODO
    const dto = (
      await db
        .select()
        .from(collections)
        .where(eq(collections.id, collectionId))
    )[0];

    if (!dto) return null;

    return CollectionDtoMapper.mapFromSelectDto(dto);
  }

  async getCollectionByVersionId(versionId: string) {
    return db.transaction(async (tx) => {
      const { activityId } = (
        await tx
          .select({ activityId: activityVersions.activityId })
          .from(activityVersions)
          .where(eq(activityVersions.id, versionId))
      )[0];

      const { collectionId } = (
        await tx
          .select({ collectionId: activities.collectionId })
          .from(activities)
          .where(eq(activities.id, activityId))
      )[0];

      const collection = (
        await tx
          .select()
          .from(collections)
          .where(eq(collections.id, collectionId))
      )[0];

      return CollectionDtoMapper.mapFromSelectDto(collection);
    });
  }
}
