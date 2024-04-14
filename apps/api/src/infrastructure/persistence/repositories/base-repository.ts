import { CollectionArray, Entity } from "@domain/abstract";
import { db } from "../schema/postgres";
import { IAbstractRepository, ChangeEventsTree } from "../interfaces";
import { eq } from "drizzle-orm";
import { TableDefinition } from "../interfaces";

export class BaseRepository<T> implements IAbstractRepository {
  protected _events: ChangeEventsTree = {};

  constructor(private _entities: { [name: string]: TableDefinition }) {}
  async save(root: Entity) {
    return db.transaction(async (tx) => {
      let result: any = {};

      const handleNewAndDelete = async (ent: Entity) => {
        const thisEntityTableDefinition = this._entities[ent.constructor.name];
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
            .where(eq((thisEntityTableDefinition.table as any).id, ent.id));
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
        const { table } = this._entities[key];
        const changesToEntitiesOfThisTable = this._events[root.id][key];
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
    for (const table of Object.keys(this._entities)) {
      _events[rootId] = { ..._events[rootId], [table]: {} };
    }
  }
}
