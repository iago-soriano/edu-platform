import { Collection } from "@domain";

export interface ICollectionsRepository {
  insert: (collection: Collection) => Promise<{ collectionId: number }>;
  update: (
    collectionId: number,
    collection: Partial<Collection>
  ) => Promise<void>;
  listByOwnership: (userId: number) => Promise<Collection[]>;
  getById: (collectionId: number) => Promise<Collection | null>;
  listByParticipation: (userId: number) => Promise<Collection[]>;
}
