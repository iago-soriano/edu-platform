import { z } from "zod";
import {
  ActivityBlockType,
  ActivityLevel,
  ActivityStatus,
  ActivityType,
  Languages,
} from "../../../domain/domain/enums";

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

export type {
  ResponseBody as GetActivityByIdResponseBody,
  Params as GetActivityByIdParams,
};
export { getActivityByIdParamsSchema };
