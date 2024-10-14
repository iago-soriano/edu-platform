import { z } from "zod";

export const OpenQuestionSchema = z.string();
export const TextSchema = z.string();
export const MultipleChoiceQuestionSchema = z.object({
  question: z.string(),
  correctAnswer: z.number(),
  alternatives: z.string().array(),
});

export type MultipleChoiceQuestion = z.infer<
  typeof MultipleChoiceQuestionSchema
>;
