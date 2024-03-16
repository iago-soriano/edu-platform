import { PaginatedParamsDTO } from "@edu-platform/common";

type ResponseBody = {
  isOwnerOf: {
    collections: {
      id: number;
      name?: string | null;
      updatedAt?: Date;
      isPrivate?: boolean;
      totalActivitiesCount?: number;
      notifyOwnerOnStudentOutput?: boolean;
      draftVersionsCount?: number;
      archivedVersionsCount?: number;
      publishedVersionsCount?: number;
      // newStudentOutputsCount: number;
      // feedbackGivenStudentOutputsCount: number;
    }[];
    pagination: {
      totalRowCount: number;
    };
  };
  participatesIn: {}[];
};
type Query = { byOwnership: boolean } & PaginatedParamsDTO;

export {
  ResponseBody as ListCollectionsByUserResponseBody,
  Query as ListCollectionsByUserQuery,
};
