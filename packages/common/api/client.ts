import {
  SaveContentRequestBody,
  SaveContentParams,
  SaveContentResponseBody,
  CreateNewActivityParams,
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
  GetActivityVersionParams,
  GetActivityVersionResponseBody,
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
  GetCollectionParams,
  GetCollectionResponseBody,
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
import { IHTTPClient } from "./interfaces";

export class ApiClient {
  constructor(private _fetcher: IHTTPClient) {}

  // ACTIVITIES
  saveContent({
    activityId,
    ...body
  }: SaveContentParams & SaveContentRequestBody) {
    return this._fetcher.post(
      `core/activities/${activityId}/versions/draft/contents`,
      body
    ) as Promise<SaveContentResponseBody>;
  }
  saveContentWithFile({
    activityId,
    formData,
  }: SaveContentParams & { formData: FormData }) {
    return this._fetcher.post(
      `core/activities/${activityId}/versions/draft/contents`,
      formData
    ) as Promise<SaveContentResponseBody>;
  }
  saveQuestion({
    activityId,
    ...body
  }: SaveQuestionParams & SaveQuestionRequestBody) {
    return this._fetcher.post(
      `core/activities/${activityId}/versions/draft/questions`,
      body
    ) as Promise<SaveQuestionResponseBody>;
  }
  createNewActivity(body: CreateNewActivityRequestBody) {
    return this._fetcher.post(
      "core/activities",
      body
    ) as Promise<CreateNewActivityResponseBody>;
  }
  getDraft({ activityId }: GetActivityVersionParams) {
    return this._fetcher.get(
      `core/activities/${activityId}/versions/draft`
    ) as Promise<GetActivityVersionResponseBody>;
  }
  getPublished({ activityId }: GetActivityVersionParams) {
    return this._fetcher.get(
      `core/activities/${activityId}/versions/published`
    ) as Promise<GetActivityVersionResponseBody>;
  }
  getArchived({ activityId, versionNumber }: GetActivityVersionParams) {
    return this._fetcher.get(
      `core/activities/${activityId}/versions/archived/${versionNumber}`
    ) as Promise<GetActivityVersionResponseBody>;
  }
  updateVersionMetadata({
    activityId,
    ...body
  }: UpdateVersionMetadataParams & UpdateVersionMetadataRequestBody) {
    return this._fetcher.patch(
      `core/activities/${activityId}/versions/draft/metadata`,
      body
    ) as Promise<UpdateVersionMetadataResponseBody>;
  }
  listActivitiesForOwner(query: ListActivitiesQuery) {
    return this._fetcher.get("core/activities/owner-view", {
      ...query,
    }) as Promise<ListActivitiesForOwnerResponseBody>;
  }
  listActivitiesForParticipant(query: ListActivitiesQuery) {
    return this._fetcher.get("core/activities/participant-view", {
      ...query,
    }) as Promise<ListActivitiesForParticipantResponseBody>;
  }
  deleteElement({ activityId, elementId }: DeleteElementParams) {
    return this._fetcher.delete(
      `core/activities/${activityId}/versions/draft/elements/${elementId}`
    ) as Promise<DeleteElementResponseBody>;
  }
  publishDraft({
    activityId,
    ...body
  }: PublishDraftParams & PublishDraftRequestBody) {
    return this._fetcher.patch(
      `core/activities/${activityId}/versions/draft/publish`,
      body
    ) as Promise<PublishDraftResponseBody>;
  }
  createNewDraftVersion({ activityId }: CreateNewDraftVersionParams) {
    return this._fetcher.post(
      `core/activities/${activityId}/versions/draft`,
      undefined
    ) as Promise<CreateNewDraftVersionResponseBody>;
  }

  // COLLECTIONS
  createNewCollection(args: CreateNewCollectionRequestBody) {
    return this._fetcher.post(
      `core/collections`,
      args
    ) as Promise<CreateNewCollectionResponseBody>;
  }
  updateCollectionMetadata({
    id,
    ...args
  }: UpdateCollectionMetadataParams & UpdateCollectionMetadataRequestBody) {
    return this._fetcher.patch(
      `core/collections/${id}`,
      args
    ) as Promise<UpdateCollectionMetadataResponseBody>;
  }
  insertUserInCollection({
    collectionId,
    ...args
  }: InsertUserInCollectionParams & InsertUserInCollectionRequestBody) {
    return this._fetcher.post(
      `core/collections/${collectionId}/participation`,
      args
    ) as Promise<InsertUserInCollectionResponseBody>;
  }
  removeUserFromCollection({
    collectionId,
    participationId,
  }: RemoveUserFromCollectionParams) {
    return this._fetcher.delete(
      `core/collections/${collectionId}/participation/${participationId}/student`,
      undefined
    ) as Promise<RemoveUserFromCollectionResponseBody>;
  }
  insertFollowerInCollection({
    collectionId,
    ...args
  }: FollowCollectionParams & FollowCollectionRequestBody) {
    return this._fetcher.post(
      `core/collections/${collectionId}/follow`,
      args
    ) as Promise<FollowCollectionResponseBody>;
  }
  unfollowCollection({
    collectionId,
    participationId,
  }: UnfollowCollectionParams) {
    return this._fetcher.delete(
      `core/collections/${collectionId}/participation/${participationId}/follower`,
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
      `core/collections/participates-in?&page=${page}&pageSize=${pageSize || 10}`
    ) as Promise<ListCollectionsForParticipantResponseBody>;
  }
  listCollectionsForOwner(
    { isPrivate, page, pageSize }: ListCollectionsForOwnerQuery = {
      isPrivate: true,
      page: 0,
      pageSize: 10,
    }
  ) {
    return this._fetcher.get(
      `core/collections/owns?isPrivate=${isPrivate}&page=${page}&pageSize=${pageSize || 10}`
    ) as Promise<ListCollectionsForOwnerResponseBody>;
  }
  async getCollection({ collectionId }: GetCollectionParams) {
    return this._fetcher.get(
      `core/collections/${collectionId}`
    ) as Promise<GetCollectionResponseBody>;
  }
  async listStudentsOfCollection({
    collectionId,
    page,
    pageSize,
  }: ListParticipantsOfCollectionQuery) {
    return this._fetcher.get(
      `core/collections/${collectionId}/participants?page=${page}&pageSize=${pageSize || 10}`
    ) as Promise<ListParticipantsOfCollectionResponseBody>;
  }
}
