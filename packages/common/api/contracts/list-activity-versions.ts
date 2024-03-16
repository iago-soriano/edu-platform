import { PaginatedParamsDTO } from "@edu-platform/common";

type RequestBody = void;

type ActivityVersionDto = {
  id: number;
  description: string | null;
  title: string | null;
  updatedAt: Date;
  version: number;
} | null;
type ResponseBody = {
  activities: {
    collectionName: string | null;
    activityId: number;
    draft: ActivityVersionDto;
    published: ActivityVersionDto;
    archivedVersionsCount: number;
  }[];
  pagination: {
    totalRowCount: number;
  };
};

type Query = {
  byOwnership: boolean;
  collectionId?: string;
} & PaginatedParamsDTO;

export {
  RequestBody as ListActivityVersionsRequestBody,
  ResponseBody as ListActivityVersionsResponseBody,
  Query as ListActivityVersionsQuery,
};
