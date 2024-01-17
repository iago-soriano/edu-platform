import { IVersions, ActivityVersionInsertDTO } from "@interfaces";
import {
  db,
  activities,
  activityVersions,
  activityContents,
  activityQuestions,
  activityVersionHasElementsRelationTable,
} from "@infrastructure";
import { eq, inArray, and, desc, asc } from "drizzle-orm";
import { VersionStatus } from "@domain";

export class Versions implements IVersions {
  async insert(activityId: number) {
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

  async update(
    id: number,
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
        .where(eq(activityVersions.id, id));
    });
  }

  async listByAuthorIdAndStatuses(authorId: number, statuses: VersionStatus[]) {
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
            statuses.length
              ? Object.keys(statuses)
              : ["Archived", "Draft", "Published"]
          )
        )
      );
    return activitiesVersionsByAuthor;
  }

  async findSimpleViewById(id: number) {
    const version = (
      await db
        .select()
        .from(activityVersions)
        .where(eq(activityVersions.id, id))
    )[0];

    return version;
  }

  // refatorar para usar join
  async findElementsByVersionId(id: number) {
    const thisVersionElements = await db
      .select()
      .from(activityVersionHasElementsRelationTable)
      .where(eq(activityVersionHasElementsRelationTable.versionId, id));

    const contentIds = thisVersionElements
      .filter((relation) => !!relation.contentId)
      .map((relation) => relation.contentId || 0);
    const questionIds = thisVersionElements
      .filter((relation) => !!relation.questionId)
      .map((relation) => relation.questionId || 0);

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

    return { contents, questions };
  }
}
