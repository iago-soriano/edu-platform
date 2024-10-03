import { CollectionArray, Entity } from "../interfaces/domain";
import {
  IAbstractRepository,
  ChangeEventsTree,
  TableDefinition,
} from "../interfaces/database";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export class BaseRepository<T> implements IAbstractRepository {
  protected _events: ChangeEventsTree = {};

  constructor(
    private _entities: { [name: string]: TableDefinition },
    private _dbClient: NodePgDatabase<Record<string, unknown>>,
  ) {}
  async save(root: Entity) {
    return this._dbClient.transaction(async (tx) => {
      let result: any = {};

      const handleEntity = async (ent: Entity) => {
        const thisEntityTableDefinition = this._entities[ent.constructor.name];
        if (ent.isNew) {
          const res = (
            await tx
              .insert(thisEntityTableDefinition.table)
              .values((thisEntityTableDefinition.serializer as any)(ent))
              .returning({
                [`${ent.constructor.name}Id`]: (
                  thisEntityTableDefinition.table as any
                ).id,
              })
          )[0];
          result = { ...result, ...res };
        } else if (ent.isDelete) {
          await tx
            .delete(thisEntityTableDefinition.table)
            .where(eq((thisEntityTableDefinition.table as any).id, ent.id));
        }

        if (Object.keys(ent._events).length) {
          const { table } = this._entities[ent.constructor.name];

          await tx
            .update(table)
            .set({ ...ent._events, updatedAt: new Date() })
            .where(eq((table as any).id, ent.id));
        }

        for (const prop in ent) {
          if (!ent.hasOwnProperty(prop)) continue;

          const val = (ent as any)[prop];
          if (val instanceof Entity) {
            await handleEntity(val);
          }
          if (val instanceof CollectionArray) {
            for (const item of val) {
              await handleEntity(item);
            }
          }
        }
      };

      await handleEntity(root);

      return result;
    });
  }

  initializeEventTracking(rootId: string | number, _events: ChangeEventsTree) {
    for (const table of Object.keys(this._entities)) {
      _events[rootId] = { ..._events[rootId], [table]: {} };
    }
  }
}
