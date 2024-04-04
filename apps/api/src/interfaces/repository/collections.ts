import { Collection } from "@domain";
import {
  ListCollectionsByUserResponseBody,
  PaginatedParamsDTO,
} from "@edu-platform/common";

export interface ICollectionsRepository {
  save: (activity: Collection) => Promise<void>;
  findRootById: (collectionId: number) => Promise<Collection | null>;
  findRootByIdWithActivityCount: (
    collectionId: number
  ) => Promise<Collection | null>;
  // getCollectionByVersionId: (versionId: string) => Promise<Collection>;
}

export interface ICollectionsReadRepository {
  listByParticipation: (
    args: { userId: number } & PaginatedParamsDTO
  ) => Promise<ListCollectionsByUserResponseBody["participatesIn"]>;
  listByOwnership: (
    args: { userId: number; isPrivate: boolean } & PaginatedParamsDTO
  ) => Promise<ListCollectionsByUserResponseBody["isOwnerOf"]>;
}
