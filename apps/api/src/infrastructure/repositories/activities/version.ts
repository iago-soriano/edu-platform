import { IVersions, ActivityVersionInsertDTO } from "@interfaces";
import {
  db,
  activities,
  activityVersions,
  activityContents,
  activityQuestions,
} from "@infrastructure";
import { eq, inArray, and, desc, asc } from "drizzle-orm";
import { VersionStatus } from "@domain";

export class Versions implements IVersions {
  async insert(activityId: number, versionNumber: number = 0) {
    return await db.transaction(async (tx) => {
      const [{ versionId }] = await tx
        .insert(activityVersions)
        .values({ activityId, version: versionNumber })
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

  async findElementsByVersionId(id: number) {
    const contents = await db
      .select()
      .from(activityContents)
      .orderBy(asc(activityContents.id))
      .where(eq(activityContents.versionId, id));

    const questions = await db
      .select()
      .from(activityQuestions)
      .orderBy(asc(activityQuestions.id))
      .where(eq(activityQuestions.versionId, id));

    return { contents, questions };
  }

  async findFullViewById(id: number) {
    const version = await this.findSimpleViewById(id);
    const { questions, contents } = await this.findElementsByVersionId(id);

    return { version, questions, contents };
  }
}
