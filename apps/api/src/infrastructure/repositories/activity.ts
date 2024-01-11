import {
  IActivitiesRepository,
  ActivityVersionInsertDTO,
  ActivityContentInsertDTO,
  ActivityInsertDTO,
} from "@interfaces";
import {
  db,
  activities,
  activityVersions,
  activityContents,
  activityQuestions,
  activityVersionHasElementsRelationTable,
} from "@infrastructure";
import { eq, inArray, and, desc, asc } from "drizzle-orm";
import { ActivityStatusType } from "@domain";

export class ActivityRepository implements IActivitiesRepository {
  async insertActivity(authorId: number) {
    return await db.transaction(async (tx) => {
      const { activityId } = (
        await tx
          .insert(activities)
          .values({ authorId })
          .returning({ activityId: activities.id })
      )[0];

      return { activityId };
    });
  }
  async insertNewVersion(activityId: number) {
    return await db.transaction(async (tx) => {
      const [{ versionId }] = await tx
        .insert(activityVersions)
        .values({ activityId })
        .returning({ versionId: activityVersions.id });
      await tx
        .update(activities)
        .set({ draftVersionId: versionId })
        .where(eq(activities.id, activityId));
      return { versionId };
    });
  }

  async updateActivityMetadata(
    activityId: number,
    { lastVersionId, draftVersionId }: ActivityInsertDTO
  ) {
    await db.transaction(async (tx) => {
      await tx
        .update(activities)
        .set({ lastVersionId, draftVersionId, updatedAt: new Date() })
        .where(eq(activities.id, activityId));
    });
  }

  async getActivityById(activityId: number) {
    return (
      await db.select().from(activities).where(eq(activities.id, activityId))
    )[0];
  }

  async updateActivityVersionMetadata(
    activityVersionId: number,
    { title, description, status, topics, version }: ActivityVersionInsertDTO
  ) {
    await db.transaction(async (tx) => {
      await tx
        .update(activityVersions)
        .set({
          title,
          description,
          status,
          topics,
          version,
          updatedAt: new Date(),
        })
        .where(eq(activityVersions.id, activityVersionId));
    });
  }

  async insertContent(content: ActivityContentInsertDTO) {
    return await db.transaction(async (tx) => {
      const { contentId } = (
        await tx
          .insert(activityContents)
          .values(content)
          .returning({ contentId: activityContents.id })
      )[0];

      return { contentId };
    });
  }
  async updateContent(
    contentId: number,
    content: ActivityContentInsertDTO,
    versionId: number
  ) {
    await db
      .update(activityContents)
      .set({ ...content, updatedAt: new Date() })
      .where(eq(activityContents.id, contentId));

    await db
      .update(activityVersions)
      .set({ updatedAt: new Date() })
      .where(eq(activityVersions.id, versionId));
  }

  async getVersionById(versionId: number) {
    const version = (
      await db
        .select()
        .from(activityVersions)
        .where(eq(activityVersions.id, versionId))
    )[0];

    const thisVersionElements = await db
      .select()
      .from(activityVersionHasElementsRelationTable)
      .where(eq(activityVersionHasElementsRelationTable.versionId, versionId));

    const contentIds = thisVersionElements
      .filter((relation) => !!relation.contentId)
      .map((relation) => relation.contentId);
    const questionIds = thisVersionElements
      .filter((relation) => !!relation.questionId)
      .map((relation) => relation.questionId);

    const contents = contentIds.length
      ? await db
          .select()
          .from(activityContents)
          .orderBy(asc(activityContents.id))
          .where(inArray(activityContents.id, contentIds))
      : [];

    const questions = questionIds.length
      ? await db
          .select()
          .from(activityQuestions)
          .orderBy(asc(activityQuestions.id))
          .where(inArray(activityQuestions.id, questionIds))
      : [];

    return { version, contents, questions };
  }

  async getActivityContentByContentId(contentId: number) {
    return (
      await db
        .select()
        .from(activityContents)
        .where(eq(activityContents.id, contentId))
    )[0];
  }

  async getActivityVersionsByAuthorIdAndStatuses(
    authorId: number,
    statuses: ActivityStatusType[]
  ) {
    const activityIdsByAuthor = (
      await db
        .select({ id: activities.id })
        .from(activities)
        .where(eq(activities.authorId, authorId))
    ).map(({ id }) => id);

    if (!activityIdsByAuthor.length) return [];

    const activitiesVersionsByAuthor = await db
      .select()
      .from(activityVersions)
      .orderBy(desc(activityVersions.updatedAt))
      .where(
        and(
          inArray(activityVersions.id, activityIdsByAuthor),
          inArray(
            activityVersions.status,
            statuses.length ? statuses : ["Archived", "Draft", "Published"]
          )
        )
      );
    return activitiesVersionsByAuthor;
  }

  async insertRelationBetweenVersionAndElement(
    versionId: number,
    contentId?: number,
    questionId?: number
  ) {
    return (
      await db
        .insert(activityVersionHasElementsRelationTable)
        .values({ versionId, contentId, questionId })
        .returning({ relationId: activityVersionHasElementsRelationTable.id })
    )[0];
  }

  async deleteContent(contentId: number) {
    await db.delete(activityContents).where(eq(activityContents.id, contentId));
  }

  async deleteContentVersionRelation(contentId: number, versionId: number) {
    await db
      .delete(activityVersionHasElementsRelationTable)
      .where(
        and(
          eq(activityVersionHasElementsRelationTable.contentId, contentId),
          eq(activityVersionHasElementsRelationTable.versionId, versionId)
        )
      );
  }
}
