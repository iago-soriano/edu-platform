import {
  CreateNewActivityParams,
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
  CreateStudentOutputRequestBody,
  CreateStudentOutputResponseBody,
  CreateStudentOutputParams,
  CreateReviewRequestBody,
  CreateReviewResponseBody,
  CreateReviewParams,
  UpdateStudentOutputRequestBody,
  UpdateStudentOutputResponseBody,
  UpdateStudentOutputParams,
} from "./contracts";

import { IHTTPClient } from "./interfaces";

export class CoreClient {
  public baseUrl: string = "core";

  constructor(private _fetcher: IHTTPClient) {}

  // ACTIVITIES
  createNewActivity(body: CreateNewActivityRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/activities`,
      body
    ) as Promise<CreateNewActivityResponseBody>;
  }

  // STUDENT OUTPUT
  createNewStudentOutput(body: CreateStudentOutputRequestBody) {
    return this._fetcher.post(
      `${this.baseUrl}/student-output`,
      body
    ) as Promise<CreateStudentOutputResponseBody>;
  }

  updateStudentOutput({
    studentOutputId,
    ...body
  }: UpdateStudentOutputParams & UpdateStudentOutputRequestBody) {
    return this._fetcher.put(
      `${this.baseUrl}/student-output/${studentOutputId}`,
      body
    ) as Promise<CreateStudentOutputResponseBody>;
  }
}
