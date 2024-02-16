import { VersionDTO, CollectionDTO, VersionStatus } from "../../dto";

type RequestBody = void;
type ResponseBody = {
  [collectionId: number]: {
    activities: {
      activityId: number;
      [VersionStatus.Draft]?: VersionDTO;
      [VersionStatus.Published]?: VersionDTO;
      [VersionStatus.Archived]?: VersionDTO[];
    }[];
    collection: CollectionDTO;
  };
};
type Query = { byOwnership: boolean; collectionId?: string };

export {
  RequestBody as ListActivityVersionsRequestBody,
  ResponseBody as ListActivityVersionsResponseBody,
  Query as ListActivityVersionsQuery,
};
