import { z } from "zod";
import { AlternativeResponseDTO, AlternativeRequestDTO } from ".";

enum QuestionTypes {
  MultipleChoice = "MultipleChoice",
  Text = "Text",
}

const questionypeSchema = z.nativeEnum(QuestionTypes);
export const parseQuestionType = questionypeSchema.parse;

const questionResponseSchema = z.object({
  id: z.number(),
  // createdAt: z.date(),
  // updatedAt: z.date(),

  type: questionypeSchema,
  order: z.number(),
  question: z.string(),
  answer: z.string(),

  versionId: z.number(),
});

export type QuestionResponseDTO = z.infer<typeof questionResponseSchema> & {
  alternatives?: AlternativeResponseDTO[];
};

const questionRequestSchema = z.object({
  id: z.number().optional(),

  type: questionypeSchema,
  order: z.number().optional(),
  question: z.string().optional(),
  answer: z.string().optional(),
});

export const parseToQuestionRequestDTO = questionRequestSchema.parse;
export type QuestionRequestDTO = z.infer<typeof questionRequestSchema> & {
  alternatives?: AlternativeRequestDTO[];
};
