import {
  SaveContentRequestBody,
  SaveContentParams,
  SaveContentResponseBody,
  CreateNewActivityParams,
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
  GetActivityVersionParams,
  GetActivityVersionRequestBody,
  GetActivityVersionResponseBody,
  UpdateVersionMetadataParams,
  UpdateVersionMetadataRequestBody,
  UpdateVersionMetadataResponseBody,
  ListActivityVersionsQuery,
  ListActivityVersionsRequestBody,
  ListActivityVersionsResponseBody,
  DeleteContentParams,
  DeleteContentRequestBody,
  DeleteContentResponseBody,
  UpdateVersionStatusParams,
  UpdateVersionStatusRequestBody,
  UpdateVersionStatusResponseBody,
  DeleteVersionParams,
  DeleteVersionRequestBody,
  DeleteVersionResponseBody,
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
  ListCollectionsByUserQuery,
  ListCollectionsByUserResponseBody,
  GetCollectionParams,
  GetCollectionResponseBody,
  ListParticipantsOfCollectionQuery,
  ListParticipantsOfCollectionResponseBody,
} from "./contracts";
import { IHTTPClient } from "./interfaces";

export class ApiClient {
  constructor(private _fetcher: IHTTPClient) {}
  public saveContent({
    activityId,
    versionId,
    ...body
  }: SaveContentParams & SaveContentRequestBody) {
    return this._fetcher.post(
      `activity/${activityId}/version/${versionId}/content`,
      body
    ) as Promise<SaveContentResponseBody>;
  }
  public createNewActivity(body: CreateNewActivityRequestBody) {
    return this._fetcher.post(
      "create-new-activity",
      body
    ) as Promise<CreateNewActivityResponseBody>;
  }
  public getActivityVersion({
    activityId,
    versionId,
  }: GetActivityVersionParams) {
    return this._fetcher.get(
      `activity/${activityId}/version/${versionId}`
    ) as Promise<GetActivityVersionResponseBody>;
  }
  public updateVersionMetadata({
    activityId,
    versionId,
    ...body
  }: UpdateVersionMetadataParams & UpdateVersionMetadataRequestBody) {
    return this._fetcher.post(
      `activity/${activityId}/update-activity-metadata/${versionId}`,
      body
    ) as Promise<UpdateVersionMetadataResponseBody>;
  }
  public listActivityVersions(query: ListActivityVersionsQuery) {
    return this._fetcher.get("activities", {
      ...query,
    }) as Promise<ListActivityVersionsResponseBody>;
  }
  public deleteContent({ versionId, contentId }: DeleteContentParams) {
    return this._fetcher.delete(
      `version/${versionId}/content/${contentId}`
    ) as Promise<DeleteContentResponseBody>;
  }
  public updateVersionStatus({
    activityId,
    versionId,
    ...body
  }: UpdateVersionStatusParams & UpdateVersionStatusRequestBody) {
    return this._fetcher.patch(
      `activity/${activityId}/version/${versionId}/status`,
      body
    ) as Promise<UpdateVersionStatusResponseBody>;
  }
  public deleteVersion({ activityId, versionId }: DeleteVersionParams) {
    return this._fetcher.delete(
      `activity/${activityId}/version/${versionId}`
    ) as Promise<DeleteVersionResponseBody>;
  }
  createNewDraftVersion({ activityId }: CreateNewDraftVersionParams) {
    return this._fetcher.post(
      `create-new-version/${activityId}`,
      undefined
    ) as Promise<CreateNewDraftVersionResponseBody>;
  }
  saveCollection(args: SaveCollectionRequestBody) {
    return this._fetcher.post(
      `collection`,
      args
    ) as Promise<SaveCollectionResponseBody>;
  }
  insertUserInCollection({
    collectionId,
    ...args
  }: InsertUserInCollectionParams & InsertUserInCollectionRequestBody) {
    return this._fetcher.post(
      `collection/${collectionId}/student`,
      args
    ) as Promise<InsertUserInCollectionResponseBody>;
  }
  removeUserFromCollection({
    collectionId,
    participationId,
  }: RemoveUserFromCollectionParams) {
    return this._fetcher.delete(
      `collection/${collectionId}/participating-student/${participationId}`,
      undefined
    ) as Promise<RemoveUserFromCollectionResponseBody>;
  }
  public listCollections(
    { byOwnership, isPrivate, page, pageSize }: ListCollectionsByUserQuery = {
      byOwnership: true,
      isPrivate: true,
      page: 0,
      pageSize: 10,
    }
  ) {
    return this._fetcher.get(
      `collection?byOwnership=${byOwnership}&isPrivate=${isPrivate}&page=${page}&pageSize=${pageSize}`
    ) as Promise<ListCollectionsByUserResponseBody>;
  }

  public async getCollection({ collectionId }: GetCollectionParams) {
    return this._fetcher.get(
      `collection/${collectionId}`
    ) as Promise<GetCollectionResponseBody>;
  }

  public async listStudentsOfCollection({
    collectionId,
    page,
    pageSize,
  }: ListParticipantsOfCollectionQuery) {
    return this._fetcher.get(
      `collection/${collectionId}/student?page=${page}&pageSize=${pageSize}`
    ) as Promise<ListParticipantsOfCollectionResponseBody>;
  }
}
