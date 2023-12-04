import {
  IActivitiesRepository,
  ActivityVersionInsertDTO,
  ActivityContentInsertDTO,
} from "@interfaces";
import {
  db,
  activities,
  activityVersions,
  activityContents,
  activityQuestions,
  activityVersionHasElementsRelationTable,
} from "@infrastructure";
import { eq, inArray, and, desc } from "drizzle-orm";
import { activityPossibleStatus, ActivityStatusType } from "@domain";

export class ActivityRepository implements IActivitiesRepository {
  async insertActivityAndNewVersion(authorId: number) {
    return await db.transaction(async (tx) => {
      const [{ activityId }] = await tx
        .insert(activities)
        .values({ authorId })
        .returning({ activityId: activities.id });
      const [{ versionId }] = await tx
        .insert(activityVersions)
        .values({ activityId })
        .returning({ versionId: activityVersions.id });
      await tx
        .update(activities)
        .set({ draftVersionId: versionId })
        .where(eq(activities.id, activityId));
      return { activityId, versionId };
    });
  }

  async getActivityById(activityId: number) {
    return (
      await db.select().from(activities).where(eq(activities.id, activityId))
    )[0];
  }

  async updateActivityVersionMetadata(
    activityVersionId: number,
    { title, description, status }: ActivityVersionInsertDTO
  ) {
    await db.transaction(async (tx) => {
      await tx
        .update(activityVersions)
        .set({ title, description, status, updatedAt: new Date() })
        .where(eq(activityVersions.id, activityVersionId));
    });
  }

  async insertContent(content: ActivityContentInsertDTO) {
    return (
      await db
        .insert(activityContents)
        .values(content)
        .returning({ contentId: activityContents.id })
    )[0];
  }
  async updateContent(contentId: number, content: ActivityContentInsertDTO) {
    await db
      .update(activityContents)
      .set({ ...content, updatedAt: new Date() })
      .where(eq(activityContents.id, contentId));
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
          .where(inArray(activityContents.id, contentIds))
      : [];

    const questions = questionIds.length
      ? await db
          .select()
          .from(activityQuestions)
          .where(inArray(activityQuestions.id, questionIds))
      : [];

    return { ...version, elements: [...contents, ...questions] };
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
}
