"use server";

import {
  Client,
  UpdateStudentOutputAnswerParams,
  UpdateStudentOutputAnswerRequestBody,
} from "@edu-platform/common/api";
import { Fetcher } from "@infrastructure";

const client = new Client(new Fetcher());

export const updateStudentOutputAnswer = async (
  studentOutputId: UpdateStudentOutputAnswerParams["studentOutputId"],
  body: UpdateStudentOutputAnswerRequestBody
) => {
  const resp = await client.updateStudentOutputAnswer(studentOutputId, body);
  return resp;
};
