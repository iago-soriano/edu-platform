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
} from "./contracts";
import { IHTTPClient } from "./interfaces";

export class ApiClient {
  constructor(private _fetcher: IHTTPClient) {}
  public saveContent(
    { activityId, versionId }: SaveContentParams,
    body: SaveContentRequestBody
  ) {
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
  public updateVersionMetadata(
    { activityId, versionId }: UpdateVersionMetadataParams,
    body: UpdateVersionMetadataRequestBody
  ) {
    return this._fetcher.post(
      `activity/${activityId}/update-activity-metadata/${versionId}`,
      body
    ) as Promise<UpdateVersionMetadataResponseBody>;
  }
  public listActivityVersions({ statuses }: ListActivityVersionsQuery) {
    return this._fetcher.get("activity", {
      statuses,
    }) as Promise<ListActivityVersionsResponseBody>;
  }
  public deleteContent({
    activityId,
    versionId,
    contentId,
  }: DeleteContentParams) {
    return this._fetcher.delete(
      `activity/${activityId}/version/${versionId}/content/${contentId}`
    ) as Promise<DeleteContentResponseBody>;
  }
  public updateVersionStatus(
    { activityId, versionId }: UpdateVersionStatusParams,
    body: UpdateVersionStatusRequestBody
  ) {
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
  insertUserInCollection(
    { collectionId }: InsertUserInCollectionParams,
    args: InsertUserInCollectionRequestBody
  ) {
    return this._fetcher.post(
      `collection/${collectionId}/student`,
      args
    ) as Promise<InsertUserInCollectionResponseBody>;
  }
  removeUserFromCollection({
    collectionId,
    studentId,
  }: RemoveUserFromCollectionParams) {
    return this._fetcher.post(
      `collection/${collectionId}/student/${studentId}`,
      undefined
    ) as Promise<RemoveUserFromCollectionResponseBody>;
  }
}
