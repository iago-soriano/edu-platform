import { Collection } from "@domain";
import { ICollections } from "@interfaces";
import {
  db,
  collections,
  studentCollectionParticipation,
} from "@infrastructure";
import { CollectionDtoMapper } from "../dto-mappers/collection";
import { and, eq, inArray } from "drizzle-orm";

export class Collections implements ICollections {
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
      .set({ ...collection, updatedAt: new Date() })
      .where(eq(collections.id, collectionId));
  }

  async insertStudent(studentId: number, collectionId: number) {
    await db
      .insert(studentCollectionParticipation)
      .values({ studentId, collectionId });
  }

  async removeStudent(studentId: number, collectionId: number) {
    await db
      .delete(studentCollectionParticipation)
      .where(
        and(
          eq(studentCollectionParticipation.studentId, studentId),
          eq(studentCollectionParticipation.collectionId, collectionId)
        )
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

    return c.map(({ collections }) =>
      CollectionDtoMapper.mapFromSelectDto(collections)
    );
  }

  async findStudentCollectionRelation(studentId: number, collectionId: number) {
    const relation = (
      await db
        .select()
        .from(studentCollectionParticipation)
        .where(
          and(
            eq(studentCollectionParticipation.studentId, studentId),
            eq(studentCollectionParticipation.collectionId, collectionId)
          )
        )
    )[0];

    return relation;
  }
}
