import { PaginatedResponse } from "../../common";

type ActivityVersionDto = {
  id: number;
  description: string;
  title: string;
  updatedAt: Date;
  version: number;
} | null;
type ResponseBody = PaginatedResponse<{
  collectionName: string;
  activityId: number;
  published: ActivityVersionDto;
}>;

export { ResponseBody as ListActivitiesForParticipantResponseBody };
