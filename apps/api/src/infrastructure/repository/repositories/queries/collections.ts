import { Collection, VersionStatus } from "@domain";
import {
  ICollectionsRepository,
  ICollectionsReadRepository,
  ICollectionParticipationsReadRepository,
} from "@interfaces";
import {
  db,
  collections,
  collectionParticipations,
  activities,
  activityVersions,
  users,
} from "@infrastructure";
import { eq, sql, desc, and } from "drizzle-orm";
import { PaginatedParamsDTO } from "@edu-platform/common";

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
    isPrivate,
    page,
    pageSize,
  }: { userId: number; isPrivate: boolean } & PaginatedParamsDTO) {
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
          totalParticipantsCount:
            sql<number>`COUNT(DISTINCT ${collectionParticipations.id})`.as(
              "totalParticipantsCount"
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
        .leftJoin(
          collectionParticipations,
          eq(collections.id, collectionParticipations.collectionId)
        )
        .groupBy(collections.id)
        .where(
          and(
            eq(collections.ownerId, userId),
            eq(collections.isPrivate, isPrivate)
          )
        )
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

export class CollectionParticipationsReadRepository
  implements ICollectionParticipationsReadRepository
{
  async listStudents({
    collectionId,
    page,
    pageSize,
  }: { collectionId: number } & PaginatedParamsDTO) {
    const qry = db.$with("sq").as(
      db
        .select({
          id: collectionParticipations.id,
          name: users.name,
          email: users.email,
          totalCount:
            sql<number>`COUNT(${collectionParticipations.id}) OVER ()`.as(
              "totalCount"
            ),
        })
        .from(collectionParticipations)
        .innerJoin(users, eq(collectionParticipations.userId, users.id))
        .groupBy(collectionParticipations.id, users.name, users.email)
        .where(
          and(
            eq(collectionParticipations.collectionId, collectionId),
            eq(collectionParticipations.type, "Student")
          )
        )
    );

    const dto = await db
      .with(qry)
      .select()
      .from(qry)
      .limit(pageSize)
      .offset(page * pageSize);

    return {
      data: dto,
      pagination: {
        totalCount: dto[0]?.totalCount,
      },
    };
  }
}
