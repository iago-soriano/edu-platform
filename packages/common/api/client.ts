import {
  SaveContentRequestBody,
  SaveContentParams,
  SaveContentResponseBody,
  CreateNewActivityParams,
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
  GetDraftParams,
  GetDraftResponseBody,
  GetArchivedParams,
  GetArchivedResponseBody,
  GetPublishedParams,
  GetPublishedResponseBody,
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
  ListCollectionsForParticipantQuery,
  ListCollectionsForParticipantResponseBody,
  ListCollectionsForOwnerQuery,
  ListCollectionsForOwnerResponseBody,
  ListParticipantsOfCollectionQuery,
  ListParticipantsOfCollectionResponseBody,
  SaveQuestionParams,
  SaveQuestionResponseBody,
  SaveQuestionRequestBody,
  FollowCollectionParams,
  FollowCollectionResponseBody,
  FollowCollectionRequestBody,
  UnfollowCollectionParams,
  UnfollowCollectionResponseBody,
  CreateNewCollectionRequestBody,
  CreateNewCollectionResponseBody,
  UpdateCollectionMetadataParams,
  UpdateCollectionMetadataRequestBody,
  UpdateCollectionMetadataResponseBody,
} from "./contracts";
import {
  Params as GetCollectionParams,
  ResponseBody as GetCollectionResponseBody,
} from "./contracts/queries/collections/get-by-id";

import { IHTTPClient } from "./interfaces";

export class CoreClient {
  public baseUrl: string = "core";

  constructor(private _fetcher: IHTTPClient) {}

  // ACTIVITIES
  saveContent({
    activityId,
    ...body
  }: SaveContentParams & SaveContentRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/activities/${activityId}/versions/draft/contents`,
      body
    ) as Promise<SaveContentResponseBody>;
  }
  saveContentWithFile({
    activityId,
    formData,
  }: SaveContentParams & { formData: FormData }) {
    return this._fetcher.post(
      `${this.baseUrl}/activities/${activityId}/versions/draft/contents`,
      formData
    ) as Promise<SaveContentResponseBody>;
  }
  saveQuestion({
    activityId,
    ...body
  }: SaveQuestionParams & SaveQuestionRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/activities/${activityId}/versions/draft/questions`,
      body
    ) as Promise<SaveQuestionResponseBody>;
  }
  createNewActivity(body: CreateNewActivityRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/activities`,
      body
    ) as Promise<CreateNewActivityResponseBody>;
  }
  getDraft({ activityId }: GetDraftParams) {
    return this._fetcher.get(
      `${this.baseUrl}/activities/${activityId}/versions/draft`
    ) as Promise<GetDraftResponseBody>;
  }
  getPublished({ activityId }: GetPublishedParams) {
    return this._fetcher.get(
      `${this.baseUrl}/activities/${activityId}/versions/published`
    ) as Promise<GetPublishedResponseBody>;
  }
  getArchived({ activityId, versionNumber }: GetArchivedParams) {
    return this._fetcher.get(
      `${this.baseUrl}/activities/${activityId}/versions/archived/${versionNumber}`
    ) as Promise<GetArchivedResponseBody>;
  }
  updateVersionMetadata({
    activityId,
    ...body
  }: UpdateVersionMetadataParams & UpdateVersionMetadataRequestBody) {
    return this._fetcher.patch(
      `${this.baseUrl}/activities/${activityId}/versions/draft/metadata`,
      body
    ) as Promise<UpdateVersionMetadataResponseBody>;
  }
  listActivitiesForOwner(query: ListActivitiesQuery) {
    return this._fetcher.get(`${this.baseUrl}/activities/owner-view`, {
      ...query,
    }) as Promise<ListActivitiesForOwnerResponseBody>;
  }
  listActivitiesForParticipant(query: ListActivitiesQuery) {
    return this._fetcher.get(`${this.baseUrl}/activities/participant-view`, {
      ...query,
    }) as Promise<ListActivitiesForParticipantResponseBody>;
  }
  deleteElement({ activityId, elementId }: DeleteElementParams) {
    return this._fetcher.delete(
      `${this.baseUrl}/activities/${activityId}/versions/draft/elements/${elementId}`
    ) as Promise<DeleteElementResponseBody>;
  }
  publishDraft({
    activityId,
    ...body
  }: PublishDraftParams & PublishDraftRequestBody) {
    return this._fetcher.patch(
      `${this.baseUrl}/activities/${activityId}/versions/draft/publish`,
      body
    ) as Promise<PublishDraftResponseBody>;
  }
  createNewDraftVersion({ activityId }: CreateNewDraftVersionParams) {
    return this._fetcher.post(
      `${this.baseUrl}/activities/${activityId}/versions/draft`,
      undefined
    ) as Promise<CreateNewDraftVersionResponseBody>;
  }

  // COLLECTIONS
  createNewCollection(args: CreateNewCollectionRequestBody) {
    console.log("updating collection");
    return this._fetcher.post(
      `${this.baseUrl}/collections`,
      args
    ) as Promise<CreateNewCollectionResponseBody>;
  }
  updateCollectionMetadata({
    id,
    ...args
  }: UpdateCollectionMetadataParams & UpdateCollectionMetadataRequestBody) {
    return this._fetcher.patch(
      `${this.baseUrl}/collections/${id}`,
      args
    ) as Promise<UpdateCollectionMetadataResponseBody>;
  }
  insertUserInCollection({
    collectionId,
    ...args
  }: InsertUserInCollectionParams & InsertUserInCollectionRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/collections/${collectionId}/participation`,
      args
    ) as Promise<InsertUserInCollectionResponseBody>;
  }
  removeUserFromCollection({
    collectionId,
    participationId,
  }: RemoveUserFromCollectionParams) {
    return this._fetcher.delete(
      `${this.baseUrl}/collections/${collectionId}/participation/${participationId}/student`,
      undefined
    ) as Promise<RemoveUserFromCollectionResponseBody>;
  }
  insertFollowerInCollection({
    collectionId,
    ...args
  }: FollowCollectionParams & FollowCollectionRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/collections/${collectionId}/follow`,
      args
    ) as Promise<FollowCollectionResponseBody>;
  }
  unfollowCollection({
    collectionId,
    participationId,
  }: UnfollowCollectionParams) {
    return this._fetcher.delete(
      `${this.baseUrl}/collections/${collectionId}/participation/${participationId}/follower`,
      undefined
    ) as Promise<UnfollowCollectionResponseBody>;
  }
  listCollectionsForParticipant(
    { page, pageSize }: ListCollectionsForParticipantQuery = {
      page: 0,
      pageSize: 10,
    }
  ) {
    return this._fetcher.get(
      `${this.baseUrl}/collections/participates-in?&page=${page}&pageSize=${pageSize || 10}`
    ) as Promise<ListCollectionsForParticipantResponseBody>;
  }
  listCollectionsForOwner({
    isPrivate,
    page,
    pageSize,
  }: ListCollectionsForOwnerQuery) {
    console.log("listing collections for teacher");
    return this._fetcher.get(
      `${this.baseUrl}/collections/owns?isPrivate=${isPrivate}&page=${page || 0}&pageSize=${pageSize || 10}`
    ) as Promise<ListCollectionsForOwnerResponseBody>;
  }
  async getCollection({ collectionId }: GetCollectionParams) {
    console.log("getting collection", collectionId);
    return this._fetcher.get(
      `${this.baseUrl}/collections/${collectionId}`
    ) as Promise<GetCollectionResponseBody>;
  }
  async listStudentsOfCollection({
    collectionId,
    page,
    pageSize,
  }: ListParticipantsOfCollectionQuery) {
    return this._fetcher.get(
      `${this.baseUrl}/collections/${collectionId}/participants?page=${page}&pageSize=${pageSize || 10}`
    ) as Promise<ListParticipantsOfCollectionResponseBody>;
  }
}
