import { Collection, User } from "@domain";
import {
  ICollectionParticipationsRepository,
  ICollectionParticipationsReadRepository,
} from "@interfaces";
import {
  db,
  collections,
  collectionParticipations,
  users,
} from "@infrastructure";
import { and, eq, inArray } from "drizzle-orm";

export class CollectionParticipationsRepository
  implements ICollectionParticipationsRepository
{
  async insertStudent(
    userId: number,
    collectionId: number,
    type: "Follower" | "Student"
  ) {
    await db
      .insert(collectionParticipations)
      .values({ userId, collectionId, type });
  }

  async removeStudent(studentId: number, collectionId: number) {
    await db
      .delete(collectionParticipations)
      .where(
        and(
          eq(collectionParticipations.userId, studentId),
          eq(collectionParticipations.collectionId, collectionId)
        )
      );
  }

  async findStudentCollectionRelation(studentId: number, collectionId: number) {
    const relation = (
      await db
        .select()
        .from(collectionParticipations)
        .where(
          and(
            eq(collectionParticipations.userId, studentId),
            eq(collectionParticipations.collectionId, collectionId)
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
      .from(collectionParticipations)
      .innerJoin(users, eq(collectionParticipations.userId, users.id))
      .where(eq(collectionParticipations.collectionId, collectionId));

    return relation.map(
      ({ users }) => new User(users.id, users.name || "", users.email || "", "")
    );
  }
}
