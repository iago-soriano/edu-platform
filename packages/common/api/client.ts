// "use server";

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
  GetGeneratedActivityByIdParams,
  GetGeneratedActivityByIdResponseBody,
  GetStudentOutputByIdParams,
  GetStudentOutputByIdResponseBody,
  GetMyActivityByIdParams,
  GetMyActivityByIdResponseBody,
} from "./contracts";

import { IHTTPClient } from "./interfaces";

export class Client {
  public baseUrl: string = "http://localhost:3001/web-api";

  constructor(private _fetcher: IHTTPClient) {}

  // ACTIVITIES
  createNewActivity(body: CreateNewActivityRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/activities/my`,
      body
    ) as Promise<CreateNewActivityResponseBody>;
  }

  createNewGeneratedActivity(body: CreateNewGeneratedActivityRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/activities/generated`,
      body
    ) as Promise<CreateNewGeneratedActivityResponseBody>;
  }

  listMyActivities(query: ListMyActivitiesQuery) {
    return this._fetcher.get(
      `${this.baseUrl}/activities/my?page=${query.page}&pageSize=${query.pageSize}`
    ) as Promise<ListMyActivitiesResponseBody>;
  }

  listGeneratedActivities(query: GetActivitiesQuery) {
    return this._fetcher.get(
      `${this.baseUrl}/activities/generated?page=${query.page}&pageSize=${query.pageSize}`
    ) as Promise<GetActivitiesResponseBody>;
  }

  getGeneratedActivityById(params: GetGeneratedActivityByIdParams) {
    return this._fetcher.get(
      `${this.baseUrl}/activities/generated/${params.activityId}`
    ) as Promise<GetGeneratedActivityByIdResponseBody>;
  }

  getMyActivityById(params: GetMyActivityByIdParams) {
    return this._fetcher.get(
      `${this.baseUrl}/activities/my/${params.activityId}`
    ) as Promise<GetMyActivityByIdResponseBody>;
  }

  // STUDENT OUTPUT
  createNewStudentOutput(body: CreateStudentOutputRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/student-outputs`,
      body
    ) as Promise<CreateStudentOutputResponseBody>;
  }

  updateStudentOutputAnswer(
    studentOutputId: UpdateStudentOutputAnswerParams["studentOutputId"],
    body: UpdateStudentOutputAnswerRequestBody
  ) {
    return this._fetcher.put(
      `${this.baseUrl}/student-output/${studentOutputId}/answer`,
      body
    ) as Promise<UpdateStudentOutputAnswerResponseBody>;
  }

  updateStudentOutputReview(
    studentOutputId: UpdateStudentOutputReviewParams["studentOutputId"],
    body: UpdateStudentOutputReviewRequestBody
  ) {
    return this._fetcher.put(
      `${this.baseUrl}/student-output/${studentOutputId}/review`,
      body
    ) as Promise<UpdateStudentOutputReviewResponseBody>;
  }

  getStudentOutputById(params: GetStudentOutputByIdParams) {
    return this._fetcher.get(
      `${this.baseUrl}/student-output/${params.studentOutputId}`
    ) as Promise<GetStudentOutputByIdResponseBody>;
  }

  // USER
  createUser(body: CreateUserRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/sign-up`,
      body
    ) as Promise<CreateUserResponseBody>;
  }
}
