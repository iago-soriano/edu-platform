import { z } from "zod";

export const studentAnswerResponseSchema = z.object({
  questionId: z.number(),
  answer: z.string(),
  studentOutputId: z.number(),
});

export type StudentAnswerResponseDTO = z.infer<
  typeof studentAnswerResponseSchema
>;

export const studentAnswerRequestSchema = z.object({
  questionId: z.number(),
  answer: z.string(),
  studentOutputId: z.number(),
});

export type StudentAnswerRequestDTO = z.infer<
  typeof studentAnswerRequestSchema
>;
export const parseToAnswerRequestDTO = studentAnswerRequestSchema.parse;
