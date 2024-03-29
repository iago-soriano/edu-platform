import { Collection } from "@domain";
import {
  ListCollectionsByUserResponseBody,
  PaginatedParamsDTO,
} from "@edu-platform/common";

export interface ICollectionsRepository {
  insert: (collection: Collection) => Promise<{ collectionId: number }>;
  update: (collection: Collection) => Promise<void>;
  getById: (collectionId: number) => Promise<Collection | null>;
  getCollectionByVersionId: (versionId: number) => Promise<Collection>;
}

export interface ICollectionsReadRepository {
  listByParticipation: (
    args: { userId: number } & PaginatedParamsDTO
  ) => Promise<ListCollectionsByUserResponseBody["participatesIn"]>;
  listByOwnership: (
    args: { userId: number; isPrivate: boolean } & PaginatedParamsDTO
  ) => Promise<ListCollectionsByUserResponseBody["isOwnerOf"]>;
}
