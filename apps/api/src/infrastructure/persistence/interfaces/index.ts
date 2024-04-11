import { Entity } from "@domain/abstract";
import { AllTablesIndexer } from "@infrastructure/persistence";

export type ChangeEventsTree = {
  [rootId: string]: {
    [key in AllTablesIndexer]: {
      [entityId: string | number]: { [prop: string]: string | number };
    };
  };
};

export interface IAbstractRepository {
  save: (root: Entity) => Promise<any>;
}
