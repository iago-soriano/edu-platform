type RequestBody = {
  newActivityStatus: string;
};
type ResponseBody = {
  lastPublishedVersion?: number;
};
type Params = {
  activityId: string;
  versionId: string;
};

export {
  RequestBody as UpdateActivityStatusRequestBody,
  ResponseBody as UpdateActivityStatusResponseBody,
  Params as UpdateActivityStatusParams,
};
