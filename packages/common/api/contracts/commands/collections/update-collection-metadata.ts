import { z } from "zod";

const updateCollectionParamsSchema = z.object({
  id: z.coerce.number(),
});

type Params = z.infer<typeof updateCollectionParamsSchema>;

const updateCollectionRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  isPrivate: z.boolean().optional(),
  notifyOwnerOnStudentOutput: z.boolean().optional(),
});
type RequestBody = z.infer<typeof updateCollectionRequestSchema>;

interface ResponseBody {}

export type {
  RequestBody as UpdateCollectionMetadataRequestBody,
  ResponseBody as UpdateCollectionMetadataResponseBody,
  Params as UpdateCollectionMetadataParams,
};

export { updateCollectionParamsSchema, updateCollectionRequestSchema };
