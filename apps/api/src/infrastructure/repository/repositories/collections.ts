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
import { CollectionDtoMapper } from "../dto-mappers/collection";
import { eq, sql, desc } from "drizzle-orm";
import { PaginatedParamsDTO } from "@edu-platform/common";

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

    return CollectionDtoMapper.mapFromSelectDto(dto);
  }

  async getCollectionByVersionId(versionId: number) {
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

export class CollectionsReadRepository implements ICollectionsReadRepository {
  async listByParticipation({
    userId,
  }: { userId: number } & PaginatedParamsDTO) {
    const c = await db
      .select()
      .from(collections)
      .innerJoin(
        collectionParticipations,
        eq(collectionParticipations.collectionId, collections.id)
      )
      .where(eq(collectionParticipations.userId, userId));

    return c.map(({ collections }) => ({
      id: collections.id,
      createdAt: collections.createdAt,
      updatedAt: collections.updatedAt,
      name: collections.name || "",
      description: collections.description || "",
      isPrivate: collections.isPrivate,
      notifyOwnerOnStudentOutput: collections.notifyOwnerOnStudentOutput,
      ownerId: collections.ownerId,
    }));
  }

  async listByOwnership({
    userId,
    page,
    pageSize,
  }: { userId: number } & PaginatedParamsDTO) {
    const sq = db.$with("sq").as(
      db
        .select({
          id: collections.id,
          name: collections.name,
          updatedAt: collections.updatedAt,
          isPrivate: collections.isPrivate,
          notifyOwnerOnStudentOutput: collections.notifyOwnerOnStudentOutput,
          totalActivitiesCount:
            sql<number>`COUNT(DISTINCT ${activities.id})`.as(
              "totalActivitiesCount"
            ),
          totalCollectionsCount:
            sql<number>`COUNT(${collections.id}) OVER ()`.as(
              "totalCollectionsCount"
            ),
          draftVersionsCount:
            sql<number>`COUNT(CASE WHEN ${activityVersions.status} = ${VersionStatus.Draft} THEN 1 END)`.as(
              "draftVersionsCount"
            ),
          archivedVersionsCount:
            sql<number>`COUNT(CASE WHEN ${activityVersions.status} = ${VersionStatus.Archived} THEN 1 END)`.as(
              "archivedVersionsCount"
            ),
          publishedVersionsCount:
            sql<number>`COUNT(CASE WHEN ${activityVersions.status} = ${VersionStatus.Published} THEN 1 END)`.as(
              "publishedVersionsCount"
            ),
        })
        .from(collections)
        .orderBy(desc(collections.updatedAt))
        .leftJoin(activities, eq(activities.collectionId, collections.id))
        .leftJoin(
          activityVersions,
          eq(activityVersions.activityId, activities.id)
        )
        .groupBy(collections.id)
        .where(eq(collections.ownerId, userId))
    );

    const dto = await db
      .with(sq)
      .select()
      .from(sq)
      .limit(pageSize)
      .offset(page * pageSize);

    return {
      collections: dto,
      pagination: {
        totalRowCount: dto[0]?.totalCollectionsCount,
      },
    };
  }
}
