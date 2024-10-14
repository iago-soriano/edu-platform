import { z } from "zod";
import {
  ActivityBlockType,
  ActivityLevel,
  ActivityStatus,
  ActivityType,
  Languages,
} from "../../../domain/enums";

type ResponseBody = {
  activityGenerated: {
    id: string;
    language: Languages;
    topics: string[];
    type: ActivityType;
    level: ActivityLevel;
    status: ActivityStatus;

    activityBlocks: {
      id: string;
      type: ActivityBlockType;
      data: any;
    }[];
  };
};

const getActivityByIdParamsSchema = z.object({
  activityId: z.string(),
});

type Params = z.infer<typeof getActivityByIdParamsSchema>;

const getActivityByIdQuerySchema = z.object({
  isGenerated: z.boolean(),
});

type Query = z.infer<typeof getActivityByIdQuerySchema>;

export type {
  ResponseBody as GetActivityByIdResponseBody,
  Params as GetActivityByIdParams,
  Query as GetActivityByIdQuery,
};
export { getActivityByIdParamsSchema };
