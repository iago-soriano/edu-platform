import { Entity } from "@domain/abstract";
// import { AllTablesIndexer } from "@infrastructure/persistence";
import { PgTable } from "drizzle-orm/pg-core";

export type ChangeEventsTree = {
  [rootId: string]: {
    [key: string]: {
      [entityId: string | number]: { [prop: string]: string | number };
    };
  };
};

export interface IAbstractRepository {
  save: (root: Entity) => Promise<any>;
}

export type TableDefinition = {
  table: PgTable;
  serializer: (args: any) => any;
};
