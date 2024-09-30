import { z } from "zod";

const paramsSchema = z.object({
  collectionId: z.coerce.number(),
});

type Params = z.infer<typeof paramsSchema>;

type ResponseBody = {
  id: number;
  name: string;
  description: string;
  isPrivate: boolean;
  notifyOwnerOnStudentOutput: boolean;
  activitiesCount: number;
};

export type { ResponseBody, Params };
export { paramsSchema };
