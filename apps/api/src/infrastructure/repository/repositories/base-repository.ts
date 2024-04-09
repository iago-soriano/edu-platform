import { CollectionArray, Entity } from "@domain";
import {
  activitiesTable,
  activityVersionsTable,
  // users,
  activityContentsTable,
  activityQuestionsTable,
  collectionsTable,
  collectionParticipationsTable,
} from "infrastructure/repository/schema/table-objects";
import { db } from "infrastructure/repository/schema/postgres";
import { IAbstractRepository, ChangeEventsTree } from "@interfaces";
import { eq } from "drizzle-orm";

export type AllTablesIndexer = keyof typeof BaseRepository.AllTables;

export class BaseRepository implements IAbstractRepository {
  protected _events: ChangeEventsTree = {};

  // name of the property must be the name of the class that extends Entity, and the value must be the table it is persisted in
  static AllTables = {
    Activity: activitiesTable,
    ActivityVersion: activityVersionsTable,
    // users: {
    //   table: users,
    //   serializer: () => {},
    // },
    VideoContent: activityContentsTable,
    ImageContent: activityContentsTable,
    TextContent: activityContentsTable,
    Collection: collectionsTable,
    ActivityQuestion: activityQuestionsTable,
    CollectionParticipation: collectionParticipationsTable,
  };

  constructor(private _entities: AllTablesIndexer[]) {}
  async save(root: Entity) {
    return db.transaction(async (tx) => {
      let result: any = {};

      const handleNewAndDelete = async (ent: Entity) => {
        const thisEntityTableDefinition =
          BaseRepository.AllTables[ent.constructor.name as AllTablesIndexer];
        if (ent.isNew) {
          const res = await tx
            .insert(thisEntityTableDefinition.table)
            .values((thisEntityTableDefinition.serializer as any)(ent))
            .returning({
              [`${ent.constructor.name}Id`]: (
                thisEntityTableDefinition.table as any
              ).id,
            });
          result = { ...result, ...res };
        } else if (ent.isDelete) {
          await tx
            .delete(thisEntityTableDefinition.table)
            .where(eq((thisEntityTableDefinition as any).id, ent.id));
        }

        for (const prop in ent) {
          if (!ent.hasOwnProperty(prop)) continue;

          const val = (ent as any)[prop];
          if (val instanceof Entity) {
            await handleNewAndDelete(val);
          }
          if (val instanceof CollectionArray) {
            for (const item of val) {
              await handleNewAndDelete(item);
            }
          }
        }
      };

      await handleNewAndDelete(root);

      // handle updates
      for (const key in this._events[root.id]) {
        const { table } = BaseRepository.AllTables[key as AllTablesIndexer];
        const changesToEntitiesOfThisTable =
          this._events[root.id][key as AllTablesIndexer];
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

  initializeEventTracking(rootId: string | number, _events: ChangeEventsTree) {
    for (const table of this._entities) {
      _events[rootId] = { ..._events[rootId], [table]: {} };
    }
  }

  filterOutDuplicates<T>(arr: T[]) {
    const hash: { [id: string]: any } = {};

    return arr.filter((item) => {
      if (!hash[(item as any).id]) {
        hash[(item as any).id] = true;
        return true;
      }
      return false;
    });
  }
}
