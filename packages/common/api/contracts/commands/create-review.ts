import { z } from "zod";

const createReviewRequestBodySchema = z.object({
  blockId: z.string().uuid(),
  review: z.string(),
});

const createReviewParamsSchema = z.object({
  studentOutputId: z.string().uuid(),
});

type Params = z.infer<typeof createReviewParamsSchema>;

type RequestBody = z.infer<typeof createReviewRequestBodySchema>;

interface ResponseBody {
  outputId: number;
}

export type {
  RequestBody as CreateReviewRequestBody,
  ResponseBody as CreateReviewResponseBody,
  Params as CreateReviewParams,
};
export { createReviewRequestBodySchema };
