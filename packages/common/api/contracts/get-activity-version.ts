import { VersionDTO } from "../../dto";

type RequestBody = void;
type ResponseBody = VersionDTO;
type Params = {
  activityId: string;
  versionId: string;
};

export {
  RequestBody as GetActivityVersionRequestBody,
  ResponseBody as GetActivityVersionResponseBody,
  Params as GetActivityVersionParams,
};
