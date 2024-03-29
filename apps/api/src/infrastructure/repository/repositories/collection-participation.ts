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
import { and, eq, sql } from "drizzle-orm";
import { PaginatedParamsDTO } from "@edu-platform/common";

export class CollectionParticipationsRepository
  implements ICollectionParticipationsRepository
{
  async insertParticipant(
    userId: number,
    collectionId: number,
    type: "Follower" | "Student"
  ) {
    await db
      .insert(collectionParticipations)
      .values({ userId, collectionId, type });
  }

  async delete(id: number) {
    await db
      .delete(collectionParticipations)
      .where(eq(collectionParticipations.id, id));
  }

  async findByParticipantAndCollectionId(
    participantId: number,
    collectionId: number
  ) {
    const relation = (
      await db
        .select()
        .from(collectionParticipations)
        .where(
          and(
            eq(collectionParticipations.userId, participantId),
            eq(collectionParticipations.collectionId, collectionId)
          )
        )
    )[0];

    return relation;
  }

  async findById(id: number) {
    const relation = (
      await db
        .select()
        .from(collectionParticipations)
        .where(eq(collectionParticipations.id, id))
    )[0];

    return relation;
  }

  async findParticipantsToBeNotified(collectionId: number) {
    const participantsToBeNotified = await db
      .select({ userId: collectionParticipations.userId })
      .from(collectionParticipations)
      .where(
        and(
          eq(collectionParticipations.notifyOnActivityInsert, true),
          eq(collectionParticipations.collectionId, collectionId)
        )
      );

    return participantsToBeNotified;
  }

  async updateNotificationsSettings(
    userId: number,
    collectionId: number,
    notifyOnActivityInsert: boolean
  ) {
    if (!collectionId) throw new Error("There must be an id to update");

    await db
      .update(collectionParticipations)
      .set({ notifyOnActivityInsert })
      .where(
        and(
          eq(collectionParticipations.userId, userId),
          eq(collectionParticipations.collectionId, collectionId)
        )
      );
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
