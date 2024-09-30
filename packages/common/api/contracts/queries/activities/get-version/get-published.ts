import { z } from "zod";
import { ElementResponseDTO, VersionStatus } from "./common";

const getPublishedParamsSchema = z.object({
  activityId: z.string().uuid(),
});

type Params = z.infer<typeof getPublishedParamsSchema>;

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

export type {
  ResponseBody as GetPublishedResponseBody,
  Params as GetPublishedParams,
};

export { getPublishedParamsSchema };
