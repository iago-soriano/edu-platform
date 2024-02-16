import { Collection } from "@domain";

export interface ICollectionsRepository {
  insert: (collection: Collection) => Promise<{ collectionId: number }>;
  update: (
    collectionId: number,
    collection: Partial<Collection>
  ) => Promise<void>;
  insertStudent: (studentId: number, collectionId: number) => Promise<void>;
  removeStudent: (studentId: number, collectionId: number) => Promise<void>;
  listByOwnership: (userId: number) => Promise<Collection[]>;
  getById: (collectionId: number) => Promise<Collection>;
  listByParticipation: (userId: number) => Promise<Collection[]>;
  findStudentCollectionRelation: (
    studentId: number,
    collectionId: number
  ) => Promise<{ studentId: number; collectionId: number } | undefined>;
}
