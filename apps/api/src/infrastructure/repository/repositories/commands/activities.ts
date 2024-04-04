import {
  Activity,
  ActivityFactory,
  ContentFactory,
  Entity,
  VersionFactory,
} from "@domain";
import { ActivitySerializer } from "../serializers/activity";
import {
  db,
  activities,
  activityVersions,
  users,
  activityContents,
  activityQuestions,
} from "@infrastructure";
import {
  IActivitiesRepository,
  PersistencePathStep,
  AggregateRootPersistenceTables,
} from "@interfaces";
import { eq } from "drizzle-orm";
import { BaseRepository } from "./abstract";
import { alias } from "drizzle-orm/pg-core";

export class ActivitiesRepository
  extends BaseRepository<typeof ActivitiesRepository.Tables>
  implements IActivitiesRepository
{
  static Tables: AggregateRootPersistenceTables = {
    activities,
    activityVersions,
    activityContents,
  };
  constructor() {
    super(ActivitiesRepository.Tables);
  }
  async save(activity: Activity) {
    const persistencePath: PersistencePathStep[] = [
      {
        entity: activity,
        table: activities,
        serializer: ActivitySerializer.serializeActivity,
      },
    ];
    const versions = [activity.draftVersion, activity.lastVersion];
    for (const version of versions) {
      if (version) {
        persistencePath.push({
          entity: version,
          table: activityVersions,
          serializer: ActivitySerializer.serializeVersion,
        });
        if (version.elements) {
          for (const element of version.elements) {
            if (element.elementType === "Content") {
              persistencePath.push({
                entity: element,
                table: activityContents,
                serializer: ActivitySerializer.serializeContent,
              });
            }
          }
        }
      }
    }

    return super.save(activity, persistencePath);
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

    super.initializeEventTracking(
      activityId,
      this._tableDefinitions,
      this._events
    );

    const activity = ActivityFactory.fromDbDTOWithProxy(
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
      .select()
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

    super.initializeEventTracking(
      activityId,
      this._tableDefinitions,
      this._events
    );

    const activity = ActivityFactory.fromDbDTOWithProxy(
      dto[0].activities,
      this._events,
      dto[0].draftVersions,
      dto[0].lastVersions,
      dto
        .map(({ draftVersionContents }) => draftVersionContents)
        .filter((c) => c !== null),
      dto
        .map(({ lastVersionContents }) => lastVersionContents)
        .filter((c) => c !== null)
    );

    return activity;
  }
}
