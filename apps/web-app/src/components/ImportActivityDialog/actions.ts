"use server";

import { Client, CreateNewActivityRequestBody } from "@edu-platform/common/api";
import { Fetcher } from "@infrastructure";
import { revalidatePath } from "next/cache";

const client = new Client(new Fetcher());

export const getGeneratedActivityById = (activityId: string) => {
  return client.getGeneratedActivityById({ activityId });
};

export const createNewMyActivity = async (
  args: CreateNewActivityRequestBody
) => {
  const resp = await client.createNewActivity(args);
  revalidatePath("/activities/my");
  return resp;
};
