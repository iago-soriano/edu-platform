import { Collection, VersionStatus } from "@domain";
import {
  ICollectionsRepository,
  ICollectionsReadRepository,
} from "@interfaces";
import {
  db,
  collections,
  studentCollectionParticipation,
  activities,
  activityVersions,
} from "@infrastructure";
import { CollectionDtoMapper } from "../dto-mappers/collection";
import { eq, sql, and } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

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
}

export class CollectionsReadRepository implements ICollectionsReadRepository {
  async listByParticipation(userId: number) {
    const c = await db
      .select()
      .from(collections)
      .innerJoin(
        studentCollectionParticipation,
        eq(studentCollectionParticipation.collectionId, collections.id)
      )
      .where(eq(studentCollectionParticipation.studentId, userId));

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

  async listByOwnership(ownerId: number) {
    const dto = await db
      .select({
        id: collections.id,
        name: collections.name,
        updatedAt: collections.updatedAt,
        isPrivate: collections.isPrivate,
        notifyOwnerOnStudentOutput: collections.notifyOwnerOnStudentOutput,
        draftVersionsCount: sql<number>`
          select cast(count(${activityVersions.id}) as int) 
          from ${activityVersions} 
          JOIN ${activities} ON ${activities.id} = ${activityVersions.activityId} 
          JOIN ${collections} ON ${activities.collectionId} = ${collections.id} 
          where ${activityVersions.status} = ${VersionStatus.Draft}
        `,
      })
      .from(collections)
      .where(eq(collections.ownerId, ownerId));

    return dto.map((collections) => ({
      id: collections.id,
      updatedAt: collections.updatedAt,
      name: collections.name || "",
      isPrivate: collections.isPrivate,
      notifyOwnerOnStudentOutput: collections.notifyOwnerOnStudentOutput,
      draftVersionsCount: collections.draftVersionsCount,
    }));
  }
}
