import {
  db,
  activities,
  activityVersions,
  activityContents,
  activityQuestions,
} from "../schema";
import { IActivitiesRepository } from "@application/interfaces";
import { eq } from "drizzle-orm";
import { BaseRepository } from "@edu-platform/common/platform";
import { AllTables } from "./all-tables";
import { alias } from "drizzle-orm/pg-core";
import { ActivitySerializer } from "../serializers";
import { filterOutDuplicates } from "./utils";

export const ActivityEntityNames = {
  Activity: AllTables["Activity"],
  ActivityVersion: AllTables["ActivityVersion"],
  VideoContent: AllTables["VideoContent"],
  ImageContent: AllTables["ImageContent"],
  TextContent: AllTables["TextContent"],
};

export class ActivitiesRepository
  extends BaseRepository<typeof AllTables>
  implements IActivitiesRepository
{
  constructor() {
    super(ActivityEntityNames, db);
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

    const activity = ActivitySerializer.deserialize(
      dto[0].activities,
      dto[0].draftVersions,
      dto[0].lastVersions
    );

    return activity;
  }

  async findRootByIdWithElements(activityId: string) {
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

    if (!dto.length) return null;

    const activity = ActivitySerializer.deserialize(
      dto[0].activities,
      dto[0].draftVersions,
      dto[0].lastVersions,
      filterOutDuplicates(
        dto
          .map(({ draftVersionContents }) => draftVersionContents)
          .filter((c) => c !== null)
      ),
      filterOutDuplicates(
        dto
          .map(({ draftVersionQuestions }) => draftVersionQuestions)
          .filter((c) => c !== null)
      ),
      filterOutDuplicates(
        dto
          .map(({ lastVersionContents }) => lastVersionContents)
          .filter((c) => c !== null)
      ),
      filterOutDuplicates(
        dto
          .map(({ lastVersionQuestions }) => lastVersionQuestions)
          .filter((c) => c !== null)
      )
    );

    return activity;
  }
}
