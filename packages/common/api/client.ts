import {
  SaveContentRequestBody,
  SaveContentParams,
  SaveContentResponseBody,
  CreateNewActivityParams,
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
  GetDraftVersionParams,
  GetDraftVersionResponseBody,
  UpdateVersionMetadataParams,
  UpdateVersionMetadataRequestBody,
  UpdateVersionMetadataResponseBody,
  ListActivitiesQuery,
  ListActivitiesForOwnerResponseBody,
  ListActivitiesForParticipantResponseBody,
  DeleteElementParams,
  DeleteElementRequestBody,
  DeleteElementResponseBody,
  PublishDraftParams,
  PublishDraftRequestBody,
  PublishDraftResponseBody,
  CreateNewDraftVersionParams,
  CreateNewDraftVersionRequestBody,
  CreateNewDraftVersionResponseBody,
  InsertUserInCollectionParams,
  InsertUserInCollectionRequestBody,
  InsertUserInCollectionResponseBody,
  RemoveUserFromCollectionParams,
  RemoveUserFromCollectionRequestBody,
  RemoveUserFromCollectionResponseBody,
  SaveCollectionParams,
  SaveCollectionRequestBody,
  SaveCollectionResponseBody,
  ListCollectionsForParticipantQuery,
  ListCollectionsForParticipantResponseBody,
  ListCollectionsForOwnerQuery,
  ListCollectionsForOwnerResponseBody,
  GetCollectionParams,
  GetCollectionResponseBody,
  ListParticipantsOfCollectionQuery,
  ListParticipantsOfCollectionResponseBody,
} from "./contracts";
import { IHTTPClient } from "./interfaces";

export class ApiClient {
  constructor(private _fetcher: IHTTPClient) {}

  // ACTIVITIES
  public saveContent({
    activityId,
    ...body
  }: SaveContentParams & SaveContentRequestBody) {
    return this._fetcher.post(
      `activities/${activityId}/versions/draft/contents`,
      body
    ) as Promise<SaveContentResponseBody>;
  }
  public createNewActivity(body: CreateNewActivityRequestBody) {
    return this._fetcher.post(
      "activities",
      body
    ) as Promise<CreateNewActivityResponseBody>;
  }
  public getDraft({ activityId }: GetDraftVersionParams) {
    return this._fetcher.get(
      `activities/${activityId}/versions/draft`
    ) as Promise<GetDraftVersionResponseBody>;
  }
  public updateVersionMetadata({
    activityId,
    ...body
  }: UpdateVersionMetadataParams & UpdateVersionMetadataRequestBody) {
    return this._fetcher.patch(
      `activities/${activityId}/versions/draft/metadata`,
      body
    ) as Promise<UpdateVersionMetadataResponseBody>;
  }
  public listActivitiesForOwner(query: ListActivitiesQuery) {
    return this._fetcher.get("activities/owner-view", {
      ...query,
    }) as Promise<ListActivitiesForOwnerResponseBody>;
  }
  public listActivitiesForParticipant(query: ListActivitiesQuery) {
    return this._fetcher.get("activities/participant-view", {
      ...query,
    }) as Promise<ListActivitiesForParticipantResponseBody>;
  }
  public deleteContent({ activityId, elementId }: DeleteElementParams) {
    return this._fetcher.delete(
      `activities/${activityId}/versions/draft/elements/${elementId}`
    ) as Promise<DeleteElementResponseBody>;
  }
  public publishDraft({
    activityId,
    ...body
  }: PublishDraftParams & PublishDraftRequestBody) {
    return this._fetcher.patch(
      `activities/${activityId}/versions/draft/publish`,
      body
    ) as Promise<PublishDraftResponseBody>;
  }
  createNewDraftVersion({ activityId }: CreateNewDraftVersionParams) {
    return this._fetcher.post(
      `activities/${activityId}/versions/draft`,
      undefined
    ) as Promise<CreateNewDraftVersionResponseBody>;
  }

  // COLLECTIONS
  saveCollection(args: SaveCollectionRequestBody) {
    return this._fetcher.post(
      `collections`,
      args
    ) as Promise<SaveCollectionResponseBody>;
  }
  insertUserInCollection({
    collectionId,
    ...args
  }: InsertUserInCollectionParams & InsertUserInCollectionRequestBody) {
    return this._fetcher.post(
      `collections/${collectionId}/participation`,
      args
    ) as Promise<InsertUserInCollectionResponseBody>;
  }
  removeUserFromCollection({
    collectionId,
    participationId,
  }: RemoveUserFromCollectionParams) {
    return this._fetcher.delete(
      `collections/${collectionId}/participation/${participationId}`,
      undefined
    ) as Promise<RemoveUserFromCollectionResponseBody>;
  }
  public listCollectionsForParticipant(
    { page, pageSize }: ListCollectionsForParticipantQuery = {
      page: 0,
      pageSize: 10,
    }
  ) {
    return this._fetcher.get(
      `collections/participant-view?&page=${page}&pageSize=${pageSize}`
    ) as Promise<ListCollectionsForParticipantResponseBody>;
  }
  public listCollectionsForOwner(
    { isPrivate, page, pageSize }: ListCollectionsForOwnerQuery = {
      isPrivate: true,
      page: 0,
      pageSize: 10,
    }
  ) {
    return this._fetcher.get(
      `collections/owner-view?isPrivate=${isPrivate}&page=${page}&pageSize=${pageSize}`
    ) as Promise<ListCollectionsForOwnerResponseBody>;
  }
  public async getCollection({ collectionId }: GetCollectionParams) {
    return this._fetcher.get(
      `collections/${collectionId}`
    ) as Promise<GetCollectionResponseBody>;
  }
  public async listStudentsOfCollection({
    collectionId,
    page,
    pageSize,
  }: ListParticipantsOfCollectionQuery) {
    return this._fetcher.get(
      `collections/${collectionId}/participants?page=${page}&pageSize=${pageSize}`
    ) as Promise<ListParticipantsOfCollectionResponseBody>;
  }
}
