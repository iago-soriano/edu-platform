import { Collection } from "@domain";

export interface ICollectionsRepository {
  insert: (collection: Collection) => Promise<{ collectionId: number }>;
  update: (collection: Collection) => Promise<void>;
  getById: (collectionId: number) => Promise<Collection | null>;
}

export interface ICollectionsReadRepository {
  listByParticipation: (userId: number) => Promise<Collection[]>;
  listByOwnership: (userId: number) => Promise<Collection[]>;
}
