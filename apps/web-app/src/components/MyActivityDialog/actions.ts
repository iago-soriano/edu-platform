"use server";

import {
  Client,
  CreateStudentOutputRequestBody,
} from "@edu-platform/common/api";
import { Fetcher } from "@infrastructure";
import { revalidatePath } from "next/cache";

const client = new Client(new Fetcher());

export const getMydActivityById = (activityId: string) => {
  return client.getMyActivityById({ activityId });
};

export const createNewStudentOutput = async (
  args: CreateStudentOutputRequestBody
) => {
  const resp = await client.createNewStudentOutput(args);
  revalidatePath("/activities/my");
  return resp;
};
