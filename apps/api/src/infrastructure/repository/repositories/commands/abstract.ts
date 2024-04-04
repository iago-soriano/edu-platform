import { Entity } from "@domain";
import {
  db,
  activities,
  activityVersions,
  users,
  activityContents,
  activityQuestions,
} from "@infrastructure";
import {
  IAbstractRepository,
  PersistencePathStep,
  ChangeEventsTree,
  AggregateRootPersistenceTables,
} from "@interfaces";
import { eq } from "drizzle-orm";

export class BaseRepository<
  PersistenceTables extends AggregateRootPersistenceTables,
> implements IAbstractRepository
{
  protected _events: ChangeEventsTree<PersistenceTables> = {};

  constructor(protected _tableDefinitions: PersistenceTables) {}
  async save(root: Entity, persistencePath: PersistencePathStep[]) {
    return db.transaction(async (tx) => {
      let result: any = {};

      for (const step of persistencePath) {
        if (step.entity.isNew) {
          if (step.withReturn) {
            const res = await tx
              .insert(step.table)
              .values(step.serializer(step.entity))
              .returning(step.withReturn);
            result = { ...result, res };
          } else {
            await tx.insert(step.table).values(step.serializer(step.entity));
          }
        } else if (step.entity.isDelete) {
          await tx
            .delete(step.table)
            .where(eq((step.table as any).id, step.entity.id as number));
        }
      }

      // handle updates
      for (const key in this._events[root.id]) {
        const tableName = key as keyof PersistenceTables;
        const table = this._tableDefinitions[tableName];
        const changesToEntitiesOfThisTable = this._events[root.id][tableName];
        for (let entityId in changesToEntitiesOfThisTable) {
          const changesToBeMadeToEntity =
            changesToEntitiesOfThisTable[entityId];
          if (Object.keys(changesToBeMadeToEntity).length) {
            await tx
              .update(table)
              .set({ ...changesToBeMadeToEntity, updatedAt: new Date() })
              .where(eq((table as any).id, entityId));
          }
        }
      }

      return result;
    });
  }

  initializeEventTracking(
    rootId: string | number,
    persistanceDefinition: AggregateRootPersistenceTables,
    _events: ChangeEventsTree<PersistenceTables>
  ) {
    Object.keys(persistanceDefinition).forEach((table) => {
      _events[rootId] = { ..._events[rootId], [table]: {} };
    });
  }
}
