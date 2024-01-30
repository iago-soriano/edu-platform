import { Collection } from "@domain";

export interface ICollections {
  insert: (collection: Collection) => Promise<{ collectionId: number }>;
  insertStudent: (studentId: number, collectionId: number) => Promise<void>;
  removeStudent: (studentId: number, collectionId: number) => Promise<void>;
  listByOwner: (ownerId: number) => Promise<Collection[]>;
  listByStudent: (studentId: number) => Promise<Collection[]>;
}
