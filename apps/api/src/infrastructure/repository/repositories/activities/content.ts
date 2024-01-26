import { IContents, ActivityContentInsertDTO } from "@interfaces";
import { db, activityVersions, activityContents } from "@infrastructure";
import { eq } from "drizzle-orm";

export class Contents implements IContents {
  async insert(content: ActivityContentInsertDTO) {
    return (
      await db
        .insert(activityContents)
        .values(content)
        .returning({ contentId: activityContents.id })
    )[0];
  }
  async update(
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

  async findById(contentId: number) {
    return (
      await db
        .select()
        .from(activityContents)
        .where(eq(activityContents.id, contentId))
    )[0];
  }

  async delete(contentId: number) {
    await db.delete(activityContents).where(eq(activityContents.id, contentId));
  }
}
