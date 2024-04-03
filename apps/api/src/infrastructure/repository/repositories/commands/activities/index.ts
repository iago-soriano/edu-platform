import {
  Activity,
  ActivityFactory,
  ContentFactory,
  VersionFactory,
} from "@domain";
import { ActivitySerializer } from "../../serializers/activity";
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
  IElements,
  IVersions,
  IChangeEvent,
} from "@interfaces";
import { eq } from "drizzle-orm";

import { alias, PgTable } from "drizzle-orm/pg-core";

type ActivityTables = {
  activities: string;
  activityVersions: string;
  activityContents: string;
};

export class ActivitiesRepository implements IActivitiesRepository {
  tables: { [key in keyof ActivityTables]: PgTable } = {
    activities,
    activityVersions,
    activityContents,
  };
  private _events: {
    [rootId: string]: {
      [key in keyof ActivityTables]: {
        [entityId: string | number]: { [prop: string]: string | number };
      };
    };
  } = {};

  async save(activity: Activity) {
    return db.transaction(async (tx) => {
      const ret: any = {};
      if (activity.isNew) {
        const { activityId } = (
          await tx
            .insert(activities)
            .values(ActivitySerializer.serializeActivity(activity))
            .returning({ activityId: activities.id })
        )[0];
        ret.activityId = activityId;
      }
      const versions = [activity.draftVersion, activity.lastVersion];
      for (const version of versions) {
        if (version?.isNew) {
          await tx
            .insert(activityVersions)
            .values(ActivitySerializer.serializeVersion(version));
        }
        if (version) {
          for (const cntnt of version?.elements) {
            if (cntnt.elementType === "Content") {
              if (cntnt.isNew) {
                await tx
                  .insert(activityContents)
                  .values(ActivitySerializer.serializeContent(cntnt));
              } else if (cntnt.isDelete) {
                await tx
                  .delete(activityContents)
                  .where(eq(activityContents.id, cntnt.id as number));
              }
            }
          }
        }
      }

      // handle updates
      for (const key in this._events[activity.id]) {
        const tableName = key as keyof ActivityTables;
        const table = this.tables[tableName];
        const changesToEntitiesOfThisTable =
          this._events[activity.id][tableName];
        for (let entityId in changesToEntitiesOfThisTable) {
          const changesToBeMadeToEntity =
            changesToEntitiesOfThisTable[entityId];
          if (Object.keys(changesToBeMadeToEntity).length) {
            await tx
              .update(this.tables[tableName])
              .set({ ...changesToBeMadeToEntity, updatedAt: new Date() })
              .where(eq((table as any).id, entityId));
          }
        }
      }

      return ret;
    });
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

    const initializeEventTracking = () => {
      this._events = {
        [activityId]: {
          activities: {
            [activityId]: {},
          },
          activityVersions: {},
          activityContents: {},
        },
      };
      if (dto[0].draftVersions) {
        const draftId = dto[0].draftVersions.id;
        this._events[activityId].activityVersions = {
          [draftId]: {},
        };
      }
      if (dto[0].lastVersions) {
        const draftId = dto[0].lastVersions.id;
        this._events[activityId].activityVersions = {
          ...this._events[activityId].activityVersions,
          [draftId]: {},
        };
      }
    };

    initializeEventTracking();

    let draftVersion = null;
    let lastVersion = null;

    if (dto[0].draftVersions) {
      const versionId = dto[0].draftVersions.id;
      const versionUpdateEvents =
        this._events[activityId].activityVersions[versionId];
      const version = VersionFactory.fromDbDTOWithProxy(
        dto[0].draftVersions,
        versionUpdateEvents
      );

      draftVersion = version;
    }
    if (dto[0].lastVersions) {
      const versionId = dto[0].lastVersions.id;
      const versionUpdateEvents =
        this._events[activityId].activityVersions[versionId];
      const version = VersionFactory.fromDbDTOWithProxy(
        dto[0].lastVersions,
        versionUpdateEvents
      );
      lastVersion = version;
    }

    const rootUpdateEvents = this._events[activityId].activities[activityId];
    const activity = ActivityFactory.fromDbDTOWithProxy(
      dto[0].activities,
      rootUpdateEvents,
      draftVersion,
      lastVersion
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

    const initializeEventTracking = () => {
      this._events = {
        [activityId]: {
          activities: {
            [activityId]: {},
          },
          activityVersions: {},
          activityContents: {},
        },
      };
      if (dto[0].draftVersions) {
        // TODO do the same for both versions
        const draftId = dto[0].draftVersions.id;
        this._events[activityId].activityVersions = {
          [draftId]: {},
        };
        const draftContents = dto
          .map(({ draftVersionContents }) => draftVersionContents)
          .filter((c) => c !== null);
        for (let draftContent of draftContents) {
          this._events[activityId].activityContents = {
            ...this._events[activityId].activityContents,
            [draftContent!.id]: {},
          };
        }
      }
      if (dto[0].lastVersions) {
        const draftId = dto[0].lastVersions.id;
        this._events[activityId].activityVersions = {
          ...this._events[activityId].activityVersions,
          [draftId]: {},
        };
      }
    };
    initializeEventTracking();

    let draftVersion = null;
    let lastVersion = null;

    if (dto[0].draftVersions) {
      const versionId = dto[0].draftVersions.id;
      const versionUpdateEvents =
        this._events[activityId].activityVersions[versionId];
      const version = VersionFactory.fromDbDTOWithProxy(
        dto[0].draftVersions,
        versionUpdateEvents
      );
      const contents = dto
        .map(({ draftVersionContents }) => draftVersionContents)
        .filter((c) => c !== null);
      for (let content of contents) {
        const contentUpdateEvents =
          this._events[activityId].activityContents[content!.id];
        version.elements.push(
          ContentFactory.fromDbDTOWithProxy(content!, contentUpdateEvents)
        );
      }
      draftVersion = version;
    }
    if (dto[0].lastVersions) {
      const versionId = dto[0].lastVersions.id;
      const versionUpdateEvents =
        this._events[activityId].activityVersions[versionId];
      const version = VersionFactory.fromDbDTOWithProxy(
        dto[0].lastVersions,
        versionUpdateEvents
      );
      const contents = dto
        .map(({ lastVersionContents }) => lastVersionContents)
        .filter((c) => c !== null);
      for (let content of contents) {
        const contentUpdateEvents =
          this._events[activityId].activityContents[content!.id];
        version.elements.push(
          ContentFactory.fromDbDTOWithProxy(content!, contentUpdateEvents)
        );
      }
      lastVersion = version;
    }

    const rootUpdateEvents = this._events[activityId].activities[activityId];
    const activity = ActivityFactory.fromDbDTOWithProxy(
      dto[0].activities,
      rootUpdateEvents,
      draftVersion,
      lastVersion
    );

    return activity;
  }
}
