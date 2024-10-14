"use server";

import { Client, CreateNewActivityRequestBody } from "@edu-platform/common/api";
import { Fetcher } from "@infrastructure";

const client = new Client(new Fetcher());

export const listGeneratedActivities = (activityId: string) => {
  return client.getGeneratedActivityById({ isGenerated: true }, { activityId });
};

export const createNewMyActivity = (args: CreateNewActivityRequestBody) => {
  return client.createNewActivity(args);
};
