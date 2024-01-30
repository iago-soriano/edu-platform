import { VersionDTO } from "../../dto";

type RequestBody = void;
type ResponseBody = VersionDTO[];
type Params = { statuses: string };

export {
  RequestBody as ListActivityVersionsRequestBody,
  ResponseBody as ListActivityVersionsResponseBody,
  Params as ListActivityVersionsParams,
};
