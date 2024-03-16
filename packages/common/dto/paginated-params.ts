import { z } from "zod";

export const paginatedParamsSchema = z.object({
  page: z.number().nonnegative(),
  pageSize: z.number().positive(),
});

export type PaginatedParamsDTO = z.infer<typeof paginatedParamsSchema>;
export const parseToPaginatedParamsDTO = paginatedParamsSchema.parse;
