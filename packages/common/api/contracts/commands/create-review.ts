import { z } from "zod";

const createReviewRequestBodySchema = z.object({
  blockId: z.string().uuid(),
  review: z.string(),
});

type Params = void;

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
