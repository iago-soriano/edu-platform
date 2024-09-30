import { z } from "zod";
import { ElementResponseDTO, VersionStatus } from "./common";

const getDraftParamsSchema = z.object({
  activityId: z.string().uuid(),
});

type Params = z.infer<typeof getDraftParamsSchema>;

interface ResponseBody {
  title: string;
  description: string;
  topics: string;
  version: number;
  collectionName: string;
  collectionId: number;
  authorId: string;
  status: VersionStatus;
  elements?: ElementResponseDTO[];
}

export type { ResponseBody as GetDraftResponseBody, Params as GetDraftParams };

export { getDraftParamsSchema };
