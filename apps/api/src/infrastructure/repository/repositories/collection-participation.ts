import {
  db,
  collections,
  collectionParticipations,
  users,
} from "@infrastructure";
import { and, eq, sql } from "drizzle-orm";
import { PaginatedParamsDTO } from "@edu-platform/common";

export class CollectionParticipationsRepository {
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
