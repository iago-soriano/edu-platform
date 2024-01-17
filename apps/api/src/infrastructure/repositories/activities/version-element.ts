import { IVersionElements } from "@interfaces";
import { db, activityVersionHasElementsRelationTable } from "@infrastructure";
import { eq, and } from "drizzle-orm";

export class VersionElements implements IVersionElements {
  async insert(versionId: number, contentId?: number, questionId?: number) {
    return (
      await db
        .insert(activityVersionHasElementsRelationTable)
        .values({ versionId, contentId, questionId })
        .returning({ relationId: activityVersionHasElementsRelationTable.id })
    )[0];
  }

  async delete(contentId: number, versionId: number) {
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
