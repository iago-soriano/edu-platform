"use server";

import {
  Client,
  UpdateStudentOutputReviewParams,
  UpdateStudentOutputReviewRequestBody,
} from "@edu-platform/common/api";
import { Fetcher } from "@infrastructure";

const client = new Client(new Fetcher());

export const updateStudentOutputReview = async (
  studentOutputId: UpdateStudentOutputReviewParams["studentOutputId"],
  body: UpdateStudentOutputReviewRequestBody
) => {
  const resp = await client.updateStudentOutputReview(studentOutputId, body);
  return resp;
};
