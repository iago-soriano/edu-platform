import { CollectionResponseDTO, VersionResponseDTO } from "../../dto";

type RequestBody = void;
type ResponseBody = VersionResponseDTO & { collection: CollectionResponseDTO };
type Params = {
  activityId: string;
  versionId: string;
};

export {
  RequestBody as GetActivityVersionRequestBody,
  ResponseBody as GetActivityVersionResponseBody,
  Params as GetActivityVersionParams,
};
