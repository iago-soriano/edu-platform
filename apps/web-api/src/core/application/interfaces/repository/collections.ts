import { Collection } from "@core/domain/entities";
import {
  ListCollectionsForParticipantResponseBody,
  ListCollectionsForOwnerResponseBody,
  ListParticipantsOfCollectionResponseBody,
  GetCollectionResponseBody,
  PaginatedParamsDTO,
} from "@edu-platform/common";
import { IAbstractRepository } from "@edu-platform/common/platform";

export interface ICollectionsRepository extends IAbstractRepository {
  findById: (collectionId: number) => Promise<Collection | null>;
  findByIdWithParticipants: (
    collectionId: number
  ) => Promise<Collection | null>;
  findByIdWithActivityCount: (collectionId: number) => Promise<{
    collection: Partial<Collection>;
    activitiesCount: number;
  } | null>;
  findByIdWithAParticipation: (
    collectionId: number,
    participationId: number
  ) => Promise<Collection | null>;
}

export interface ICollectionsReadRepository {
  listByParticipation: (
    args: { userId: string } & PaginatedParamsDTO
  ) => Promise<ListCollectionsForParticipantResponseBody>;
  listByOwnership: (
    args: { userId: string; isPrivate: boolean } & PaginatedParamsDTO
  ) => Promise<ListCollectionsForOwnerResponseBody>;
  listStudents: (
    args: { collectionId: number } & PaginatedParamsDTO
  ) => Promise<ListParticipantsOfCollectionResponseBody>;
  findByIdForOwner: (
    collectionId: number,
    user: { id: string }
  ) => Promise<GetCollectionResponseBody | null>;
}
