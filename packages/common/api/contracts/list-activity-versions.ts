import {
  VersionResponseDTO,
  CollectionResponseDTO,
  VersionStatus,
} from "../../dto";

type RequestBody = void;
type ResponseBody = {
  activities: // {
  //   collectionName: string | null;
  //   activityId: unknown;
  //   draftVersionId: unknown;
  //   publishedTitle: string | null;
  //   archivedVersionsCount: number;
  //   totalActivitiesCount: number;
  // }
  unknown[];
  pagination: {
    totalRowCount: number;
  };
};
// {
//   [collectionId: number]: {
//     activities: {
//       activityId: number;
//       [VersionStatus.Draft]?: VersionResponseDTO;
//       [VersionStatus.Published]?: VersionResponseDTO;
//       [VersionStatus.Archived]?: VersionResponseDTO[];
//     }[];
//     collection: CollectionResponseDTO;
//   };
// };
type Query = { byOwnership: boolean; collectionId?: string };

export {
  RequestBody as ListActivityVersionsRequestBody,
  ResponseBody as ListActivityVersionsResponseBody,
  Query as ListActivityVersionsQuery,
};
