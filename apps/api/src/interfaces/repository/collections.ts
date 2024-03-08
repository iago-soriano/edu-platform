import { Collection } from "@domain";
import { ListCollectionsByUserResponseBody } from "@edu-platform/common";

export interface ICollectionsRepository {
  insert: (collection: Collection) => Promise<{ collectionId: number }>;
  update: (collection: Collection) => Promise<void>;
  getById: (collectionId: number) => Promise<Collection | null>;
}

export interface ICollectionsReadRepository {
  listByParticipation: (
    userId: number
  ) => Promise<ListCollectionsByUserResponseBody["participatesIn"]>;
  listByOwnership: (
    userId: number
  ) => Promise<ListCollectionsByUserResponseBody["isOwnerOf"]>;
}
