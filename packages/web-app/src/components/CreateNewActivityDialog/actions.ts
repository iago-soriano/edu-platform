"use server";

import {
  Client,
  CreateNewGeneratedActivityRequestBody,
} from "@edu-platform/common";

import { Fetcher } from "@infrastructure";
import { revalidatePath } from "next/cache";

const client = new Client(new Fetcher());

export const generateNewActivity = async (
  args: CreateNewGeneratedActivityRequestBody
) => {
  const resp = await client.createNewGeneratedActivity(args);
  revalidatePath("/activities/trending");
  return resp;
};
