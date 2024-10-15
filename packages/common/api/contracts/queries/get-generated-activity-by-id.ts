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

const getGeneratedActivityByIdParamsSchema = z.object({
  activityId: z.string(),
});

type Params = z.infer<typeof getGeneratedActivityByIdParamsSchema>;

export type {
  ResponseBody as GetGeneratedActivityByIdResponseBody,
  Params as GetGeneratedActivityByIdParams,
};
export { getGeneratedActivityByIdParamsSchema };
