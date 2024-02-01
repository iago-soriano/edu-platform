import { VersionDTO } from "../../dto";

type RequestBody = void;
type ResponseBody = VersionDTO[];
type Query = { statuses: string };

export {
  RequestBody as ListActivityVersionsRequestBody,
  ResponseBody as ListActivityVersionsResponseBody,
  Query as ListActivityVersionsQuery,
};
