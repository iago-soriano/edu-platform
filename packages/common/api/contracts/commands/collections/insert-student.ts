import { z } from "zod";

const insertStudentParamsSchema = z.object({
  collectionId: z.coerce.number(),
});

type Params = z.infer<typeof insertStudentParamsSchema>;

const insertStudentRequestBodySchema = z.object({
  studentEmail: z.string(),
});

type RequestBody = z.infer<typeof insertStudentRequestBodySchema>;

interface ResponseBody {}

export type {
  RequestBody as InsertUserInCollectionRequestBody,
  ResponseBody as InsertUserInCollectionResponseBody,
  Params as InsertUserInCollectionParams,
};

export { insertStudentParamsSchema, insertStudentRequestBodySchema };
