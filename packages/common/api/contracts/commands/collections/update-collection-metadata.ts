import { z } from "zod";

export const collectionRequestSchema = z.object({
  id: z.coerce.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  isPrivate: z.boolean().optional(),
  notifyOwnerOnStudentOutput: z.boolean().optional(),
});
export type CollectionRequestDTO = z.infer<typeof collectionRequestSchema>;
export const parseToCollectionRequestDTO = collectionRequestSchema.parse;

type RequestBody = CollectionRequestDTO;
type ResponseBody = {};
type Params = { id: number };

export type {
  RequestBody as UpdateCollectionMetadataRequestBody,
  ResponseBody as UpdateCollectionMetadataResponseBody,
  Params as UpdateCollectionMetadataParams,
};
