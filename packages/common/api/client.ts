import {
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
  CreateStudentOutputRequestBody,
  CreateStudentOutputResponseBody,
  CreateUserRequestBody,
  CreateUserResponseBody,
  UpdateStudentOutputAnswerParams,
  UpdateStudentOutputAnswerRequestBody,
  UpdateStudentOutputAnswerResponseBody,
  UpdateStudentOutputReviewParams,
  UpdateStudentOutputReviewRequestBody,
  UpdateStudentOutputReviewResponseBody,
  ListMyActivitiesQuery,
  ListMyActivitiesResponseBody,
  GetActivitiesQuery,
  GetActivitiesResponseBody,
  CreateNewGeneratedActivityRequestBody,
  CreateNewGeneratedActivityResponseBody,
} from "./contracts";

import { IHTTPClient } from "./interfaces";

export class Client {
  public baseUrl: string = "http://localhost:3001/web-api";

  constructor(private _fetcher: IHTTPClient) {}

  // ACTIVITIES
  createNewActivity(body: CreateNewActivityRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/activities/new`,
      body
    ) as Promise<CreateNewActivityResponseBody>;
  }

  createNewGeneratedActivity(body: CreateNewGeneratedActivityRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/activities`,
      body
    ) as Promise<CreateNewGeneratedActivityResponseBody>;
  }

  listMyActivities(query: ListMyActivitiesQuery) {
    return this._fetcher.get(
      `${this.baseUrl}/activities/my`
    ) as Promise<ListMyActivitiesResponseBody>;
  }

  listGeneratedActivities(query: GetActivitiesQuery) {
    return this._fetcher.get(
      `${this.baseUrl}/activities/generated?page=${query.page}&pageSize=${query.pageSize}`
    ) as Promise<GetActivitiesResponseBody>;
  }

  // STUDENT OUTPUT
  createNewStudentOutput(body: CreateStudentOutputRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/student-output`,
      body
    ) as Promise<CreateStudentOutputResponseBody>;
  }

  updateStudentOutputAnswer({
    studentOutputId,
    ...body
  }: UpdateStudentOutputAnswerParams & UpdateStudentOutputAnswerRequestBody) {
    return this._fetcher.put(
      `${this.baseUrl}/student-output/${studentOutputId}/answer`,
      body
    ) as Promise<UpdateStudentOutputAnswerResponseBody>;
  }

  updateStudentOutputReview({
    studentOutputId,
    ...body
  }: UpdateStudentOutputReviewParams & UpdateStudentOutputReviewRequestBody) {
    return this._fetcher.put(
      `${this.baseUrl}/student-output/${studentOutputId}/review`,
      body
    ) as Promise<UpdateStudentOutputReviewResponseBody>;
  }

  // USER
  createUser(body: CreateUserRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/sign-up`,
      body
    ) as Promise<CreateUserResponseBody>;
  }
}
