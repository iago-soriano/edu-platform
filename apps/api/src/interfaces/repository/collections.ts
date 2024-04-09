import { Collection } from "@domain";
import {
  ListCollectionsForParticipantResponseBody,
  ListCollectionsForOwnerResponseBody,
  ListParticipantsOfCollectionResponseBody,
  GetCollectionResponseBody,
  PaginatedParamsDTO,
} from "@edu-platform/common";
import { IAbstractRepository } from "./abstract";

export interface ICollectionsRepository extends IAbstractRepository {
  findRootById: (collectionId: number) => Promise<Collection | null>;
  findRootByIdWithParticipants: (
    collectionId: number
  ) => Promise<Collection | null>;
  findRootByIdWithActivityCount: (
    collectionId: number
  ) => Promise<Collection | null>;
}

export interface ICollectionsReadRepository {
  listByParticipation: (
    args: { userId: number } & PaginatedParamsDTO
  ) => Promise<ListCollectionsForParticipantResponseBody>;
  listByOwnership: (
    args: { userId: number; isPrivate: boolean } & PaginatedParamsDTO
  ) => Promise<ListCollectionsForOwnerResponseBody>;
  listStudents: (
    args: { collectionId: number } & PaginatedParamsDTO
  ) => Promise<ListParticipantsOfCollectionResponseBody>;
  findByIdForOwner: (
    collectionId: number,
    user: { id: number }
  ) => Promise<GetCollectionResponseBody | null>;
}
