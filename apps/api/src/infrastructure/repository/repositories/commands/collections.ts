import { Collection, VersionStatus } from "@domain";
import {
  ICollectionsRepository,
  ICollectionsReadRepository,
} from "@interfaces";
import { db, collections, collectionParticipations } from "@infrastructure";
import { CollectionDtoMapper } from "../../dto-mappers/collection";
import { eq, sql, desc, and } from "drizzle-orm";
import { CollectionSerializer } from "../serializers/collection";
import { alias, PgTable } from "drizzle-orm/pg-core";

type CollectionTables = {
  collections: string;
  collectionParticipations: string;
};

export class CollectionsRepository implements ICollectionsRepository {
  tables: { [key in keyof CollectionTables]: PgTable } = {
    collections,
    collectionParticipations,
  };
  private _events: {
    [rootId: string]: {
      [key in keyof CollectionTables]: {
        [entityId: string | number]: { [prop: string]: string | number };
      };
    };
  } = {};

  async save(collection: Collection) {
    return db.transaction(async (tx) => {
      const ret: any = {};
      if (collection.isNew) {
        const { collectionId } = (
          await tx
            .insert(collections)
            .values(CollectionSerializer.serializeCollection(collection))
            .returning({ collectionId: collections.id })
        )[0];
        ret.collectionId = collectionId;
      }

      // if(collection.participants) {}

      // handle updates
      for (const key in this._events[collection.id]) {
        const tableName = key as keyof CollectionTables;
        const table = this.tables[tableName];
        const changesToEntitiesOfThisTable =
          this._events[collection.id][tableName];
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

  async findRootById(collectionId: number) {
    const dto = (
      await db
        .select()
        .from(collections)
        .where(eq(collections.id, collectionId))
    )[0];

    if (!dto) return null;

    return CollectionDtoMapper.mapFromSelectDto(dto);
  }

  async findRootByIdWithActivityCount(collectionId: number) {
    //TODO
    const dto = (
      await db
        .select()
        .from(collections)
        .where(eq(collections.id, collectionId))
    )[0];

    if (!dto) return null;

    return CollectionDtoMapper.mapFromSelectDto(dto);
  }
}
