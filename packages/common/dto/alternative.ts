import { z } from "zod";

const alternativeResponseSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),

  order: z.number(),
  text: z.string(),
  comment: z.string(),
  isCorrect: z.boolean(),
  questionId: z.number(),
});

export type AlternativeResponseDTO = z.infer<typeof alternativeResponseSchema>;

const alternativeRequestSchema = z.object({
  id: z.number().optional(),
  order: z.number().optional(),
  text: z.string().optional(),
  comment: z.string().optional(),
  isCorrect: z.boolean().optional(),
});

export type AlternativeRequestDTO = z.infer<typeof alternativeRequestSchema>;
export const parseToAlternativeRequestDTO = alternativeRequestSchema.parse;
