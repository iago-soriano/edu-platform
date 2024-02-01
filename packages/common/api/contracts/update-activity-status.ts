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
  RequestBody as UpdateVersionStatusRequestBody,
  ResponseBody as UpdateVersionStatusResponseBody,
  Params as UpdateVersionStatusParams,
};
