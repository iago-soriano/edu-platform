import { Collection } from "@domain";

export interface ICollections {
  insert: (collection: Collection) => Promise<{ collectionId: number }>;
  update: (
    collectionId: number,
    collection: Partial<Collection>
  ) => Promise<void>;
  insertStudent: (studentId: number, collectionId: number) => Promise<void>;
  removeStudent: (studentId: number, collectionId: number) => Promise<void>;
  listByOwner: (ownerId: number) => Promise<Collection[]>;
  getById: (collectionId: number) => Promise<Collection>;
  listByStudent: (studentId: number) => Promise<Collection[]>;
}
