import { z } from "zod";
import {
  ActivityBlockType,
  ActivityLevel,
  ActivityStatus,
  ActivityType,
  Languages,
} from "../../../domain/enums";

type ResponseBody = {
  activity: {
    id: string;
    requestingUserId: string;
    title: string;

    activityBlocks: {
      id: string;
      type: ActivityBlockType;
      data: any;
    }[];
  };
};

const getMyActivityByIdParamsSchema = z.object({
  activityId: z.string(),
});

type Params = z.infer<typeof getMyActivityByIdParamsSchema>;

export type {
  ResponseBody as GetMyActivityByIdResponseBody,
  Params as GetMyActivityByIdParams,
};
export { getMyActivityByIdParamsSchema };
