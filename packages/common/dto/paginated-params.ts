import { z } from "zod";

export const paginatedParamsSchema = z.object({
  page: z.coerce.number().nonnegative(),
  pageSize: z.coerce.number().positive(),
});

export type PaginatedParamsDTO = z.infer<typeof paginatedParamsSchema>;
export const parseToPaginatedParamsDTO = paginatedParamsSchema.parse;

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    totalCount: number;
  };
};
