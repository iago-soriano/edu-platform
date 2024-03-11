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
  ListStudentsOfCollectionParams,
  ListStudentsOfCollectionResponseBody,
} from "./contracts";
import { IHTTPClient } from "./interfaces";

interface IApiClient {
  createNewActivity: (
    body: CreateNewActivityRequestBody
  ) => Promise<CreateNewActivityResponseBody>;
}
export class ApiClient implements IApiClient {
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
    return this._fetcher.get("activity", {
      byOwnership: query.byOwnership.toString(),
      collectionId: query.collectionId || "",
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
    studentId,
  }: RemoveUserFromCollectionParams) {
    return this._fetcher.delete(
      `collection/${collectionId}/student/${studentId}`,
      undefined
    ) as Promise<RemoveUserFromCollectionResponseBody>;
  }
  public listCollections(
    { byOwnership }: ListCollectionsByUserQuery = { byOwnership: false }
  ) {
    return this._fetcher.get(
      `collection?byOwnership=${byOwnership}`
    ) as Promise<ListCollectionsByUserResponseBody>;
  }

  public async getCollection({ collectionId }: GetCollectionParams) {
    return this._fetcher.get(
      `collection/${collectionId}`
    ) as Promise<GetCollectionResponseBody>;
  }

  public async getStudentsOfCollection({
    collectionId,
  }: ListStudentsOfCollectionParams) {
    return this._fetcher.get(
      `collection/${collectionId}/student`
    ) as Promise<ListStudentsOfCollectionResponseBody>;
    // return [{ id: 1, name: "student 1", email: "email1" }];
  }
}
