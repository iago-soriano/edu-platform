import { Collection } from "@domain";
import { ListCollectionsByUserResponseBody } from "@edu-platform/common";
import { PaginatedParams } from ".";

export interface ICollectionsRepository {
  insert: (collection: Collection) => Promise<{ collectionId: number }>;
  update: (collection: Collection) => Promise<void>;
  getById: (collectionId: number) => Promise<Collection | null>;
}

export interface ICollectionsReadRepository {
  listByParticipation: (
    args: { userId: number } & PaginatedParams
  ) => Promise<ListCollectionsByUserResponseBody["participatesIn"]>;
  listByOwnership: (
    args: { userId: number } & PaginatedParams
  ) => Promise<ListCollectionsByUserResponseBody["isOwnerOf"]>;
}
