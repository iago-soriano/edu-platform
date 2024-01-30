import { VersionDTO } from "../../dto";

type RequestBody = VersionDTO;
type ResponseBody = {
  activityId: number;
};
type Params = {
  activityId: string;
  versionId: string;
};

export {
  RequestBody as UpdateVersionMetadataRequestBody,
  ResponseBody as UpdateVersionMetadataResponseBody,
  Params as UpdateVersionMetadataParams,
};
