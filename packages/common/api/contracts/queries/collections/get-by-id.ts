import { z } from "zod";

const collectionResponseSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),

  name: z.string(),
  description: z.string(),
  isPrivate: z.boolean(),
  notifyOwnerOnStudentOutput: z.boolean(),

  ownerId: z.number(),
});
export type CollectionResponseDTO = z.infer<typeof collectionResponseSchema>;

type Params = { collectionId: number };
type ResponseBody = CollectionResponseDTO;

export {
  ResponseBody as GetCollectionResponseBody,
  Params as GetCollectionParams,
};
