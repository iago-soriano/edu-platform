import { Collection } from "@domain";
import {
  ICollectionsRepository,
  ICollectionsReadRepository,
} from "@interfaces";
import {
  db,
  collections,
  studentCollectionParticipation,
} from "@infrastructure";
import { CollectionDtoMapper } from "../dto-mappers/collection";
import { and, eq, inArray } from "drizzle-orm";

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

    return c.map(({ collections }) =>
      CollectionDtoMapper.mapFromSelectDto(collections)
    );
  }

  async listByOwnership(ownerId: number) {
    const dto = await db
      .select()
      .from(collections)
      .where(eq(collections.ownerId, ownerId));

    return dto.map((collection) =>
      CollectionDtoMapper.mapFromSelectDto(collection)
    );
  }
}
