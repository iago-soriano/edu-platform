import { z } from "zod";

export const collectionRequestSchema = z.object({
  id: z.number().optional(),

  name: z.string().optional(),
  description: z.string().optional(),
  isPrivate: z.boolean().optional(),
  notifyOwnerOnStudentOutput: z.boolean().optional(),
});
export type CollectionRequestDTO = z.infer<typeof collectionRequestSchema>;
export const parseToCollectionRequestDTO = collectionRequestSchema.parse;

type RequestBody = CollectionRequestDTO;
type ResponseBody = { collectionId: number };
type Params = {};

export {
  RequestBody as SaveCollectionRequestBody,
  ResponseBody as SaveCollectionResponseBody,
  Params as SaveCollectionParams,
};
