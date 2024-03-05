import { Collection, User } from "@domain";
import {
  ICollectionParticipationsRepository,
  ICollectionParticipationsReadRepository,
} from "@interfaces";
import {
  db,
  collections,
  studentCollectionParticipation,
  users,
} from "@infrastructure";
import { and, eq, inArray } from "drizzle-orm";

export class CollectionParticipationsRepository
  implements ICollectionParticipationsRepository
{
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

export class CollectionParticipationsReadRepository
  implements ICollectionParticipationsReadRepository
{
  async listStudents(collectionId: number) {
    const relation = await db
      .select()
      .from(studentCollectionParticipation)
      .innerJoin(users, eq(studentCollectionParticipation.studentId, users.id))
      .where(eq(studentCollectionParticipation.collectionId, collectionId));

    return relation.map(
      ({ users }) => new User(users.id, users.name || "", users.email || "", "")
    );
  }
}
