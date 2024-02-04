import { VersionDTO, VersionStatus } from "../../dto";

type RequestBody = void;
type ResponseBody = {
  [activityId: string]: {
    [VersionStatus.Draft]?: VersionDTO;
    [VersionStatus.Published]?: VersionDTO;
    [VersionStatus.Archived]?: VersionDTO[];
  };
};
type Query = { statuses: string };

export {
  RequestBody as ListActivityVersionsRequestBody,
  ResponseBody as ListActivityVersionsResponseBody,
  Query as ListActivityVersionsQuery,
};
