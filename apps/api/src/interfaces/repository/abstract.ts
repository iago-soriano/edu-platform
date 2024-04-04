import { Entity } from "@domain";
import { alias, PgColumn, PgTable } from "drizzle-orm/pg-core";

export type PersistencePathStep = {
  entity: Entity;
  table: PgTable;
  serializer: (args: any) => any;
  withReturn?: { [key: string]: PgColumn };
};

export type ChangeEventsTree<T> = {
  [rootId: string]: {
    [key in keyof T]: {
      [entityId: string | number]: { [prop: string]: string | number };
    };
  };
};

export type AggregateRootPersistenceTables = {
  [tableName: string]: PgTable;
};

export interface IAbstractRepository {
  save: (activity: any, persistencePath: PersistencePathStep[]) => Promise<any>;
}
