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
} from "./contracts";
import { IHTTPClient } from "./interfaces";

// const toQueryStringFromList = (list: string) => list.split(",").join("&");

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
    return this._fetcher.post(
      `activity/${activityId}/update-activity-metadata/${versionId}`,
      body
    ) as Promise<UpdateVersionStatusResponseBody>;
  }
  public deleteVersion({ activityId, versionId }: DeleteVersionParams) {
    return this._fetcher.delete(
      `activity/${activityId}/version/${versionId}`
    ) as Promise<DeleteVersionResponseBody>;
  }
}
