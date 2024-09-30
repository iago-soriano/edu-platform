import { z } from "zod";
import { ElementResponseDTO, VersionStatus } from "./common";

const getArchivedParamsSchema = z.object({
  activityId: z.string().uuid(),
  versionNumber: z.coerce.number().positive(),
});

type Params = z.infer<typeof getArchivedParamsSchema>;

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
  ResponseBody as GetArchivedResponseBody,
  Params as GetArchivedParams,
};

export { getArchivedParamsSchema };
