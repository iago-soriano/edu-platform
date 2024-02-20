import { Collection } from "@domain";
import { ICollectionsRepository } from "@interfaces";
import {
  db,
  collections,
  studentCollectionParticipation,
} from "@infrastructure";
import { CollectionDtoMapper } from "../dto-mappers/collection";
import { and, eq, inArray } from "drizzle-orm";

export class CollectionsRepository implements ICollectionsRepository {
  async insert(collection: Collection) {
    const dto = CollectionDtoMapper.mapToInsertDto(collection);

    return (
      await db
        .insert(collections)
        .values(dto)
        .returning({ collectionId: collections.id })
    )[0];
  }

  async update(collectionId: number, collection: Partial<Collection>) {
    await db
      .update(collections)
      .set(CollectionDtoMapper.mapToInsertDto(collection))
      .where(eq(collections.id, collectionId));
  }

  async listByOwnership(ownerId: number) {
    const dto = await db
      .select()
      .from(collections)
      .where(eq(collections.ownerId, ownerId));

    return dto.map(
      (collection) =>
        CollectionDtoMapper.mapFromSelectDto(collection) || new Collection()
    );
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

  async listByParticipation(userId: number) {
    const c = await db
      .select()
      .from(collections)
      .innerJoin(
        studentCollectionParticipation,
        eq(studentCollectionParticipation.collectionId, collections.id)
      )
      .where(eq(studentCollectionParticipation.studentId, userId));

    return c.map(
      ({ collections }) =>
        CollectionDtoMapper.mapFromSelectDto(collections) || new Collection()
    );
  }
}
