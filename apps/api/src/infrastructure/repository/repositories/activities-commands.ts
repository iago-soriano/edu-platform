import {
  db,
  activities,
  activityVersions,
  activityContents,
  activityQuestions,
} from "@infrastructure";
import { IActivitiesRepository } from "@interfaces";
import { eq } from "drizzle-orm";
import { BaseRepository, AllTablesIndexer } from "./base-repository";
import { alias } from "drizzle-orm/pg-core";
import { ActivitySerializer } from "../serializers";

export const ActivityEntityNames: AllTablesIndexer[] = [
  "Activity",
  "ActivityVersion",
  "VideoContent",
  "ImageContent",
  "TextContent",
];

export class ActivitiesRepository
  extends BaseRepository
  implements IActivitiesRepository
{
  constructor() {
    super(ActivityEntityNames);
  }

  async findRootById(activityId: string) {
    const draftVersions = alias(activityVersions, "draftVersions");
    const lastVersions = alias(activityVersions, "lastVersions");

    const dto = await db
      .select()
      .from(activities)
      .leftJoin(draftVersions, eq(draftVersions.id, activities.draftVersionId))
      .leftJoin(lastVersions, eq(lastVersions.id, activities.lastVersionId))
      .where(eq(activities.id, activityId));

    super.initializeEventTracking(activityId, this._events);

    const activity = ActivitySerializer.deserialize(
      dto[0].activities,
      this._events,
      dto[0].draftVersions,
      dto[0].lastVersions
    );

    return activity;
  }

  async findRootByIdWithContents(activityId: string) {
    const draftVersions = alias(activityVersions, "draftVersions");
    const draftVersionContents = alias(
      activityContents,
      "draftVersionContents"
    );
    const draftVersionQuestions = alias(
      activityQuestions,
      "draftVersionQuestions"
    );

    const lastVersions = alias(activityVersions, "lastVersions");
    const lastVersionContents = alias(activityContents, "lastVersionContents");
    const lastVersionQuestions = alias(
      activityQuestions,
      "lastVersionQuestions"
    );

    const dto = await db
      .selectDistinctOn([
        lastVersionContents.id,
        draftVersionContents.id,
        draftVersionQuestions.id,
        lastVersionQuestions.id,
      ])
      .from(activities)

      // full draft version
      .leftJoin(draftVersions, eq(draftVersions.id, activities.draftVersionId))
      .leftJoin(
        draftVersionContents,
        eq(draftVersions.id, draftVersionContents.versionId)
      )
      .leftJoin(
        draftVersionQuestions,
        eq(draftVersions.id, draftVersionQuestions.versionId)
      )

      // full last version
      .leftJoin(lastVersions, eq(lastVersions.id, activities.lastVersionId))
      .leftJoin(
        lastVersionContents,
        eq(lastVersions.id, lastVersionContents.versionId)
      )
      .leftJoin(
        lastVersionQuestions,
        eq(lastVersions.id, lastVersionQuestions.versionId)
      )

      .where(eq(activities.id, activityId));

    super.initializeEventTracking(activityId, this._events);

    const activity = ActivitySerializer.deserialize(
      dto[0].activities,
      this._events,
      dto[0].draftVersions,
      dto[0].lastVersions,
      super.filterOutDuplicates(
        dto
          .map(({ draftVersionContents }) => draftVersionContents)
          .filter((c) => c !== null)
      ),
      super.filterOutDuplicates(
        dto
          .map(({ lastVersionContents }) => lastVersionContents)
          .filter((c) => c !== null)
      )
    );

    return activity;
  }
}
