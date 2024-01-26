import { z } from "zod";

enum QuestionTypes {
  MultipleChoice = "MultipleChoice",
  Text = "Text",
}

const questionypeSchema = z.nativeEnum(QuestionTypes);
export const parseQuestionType = questionypeSchema.parse;

const alternativeSchema = z.object({
  id: z.number().optional(),
  order: z.number(),
  text: z.string(),
  comment: z.string().optional(),
  isCorrect: z.boolean(),
  questionId: z.number(),
});

const questionSchema = z.object({
  id: z.number().optional(),
  versionId: z.number(),
  type: questionypeSchema,

  order: z.number(),

  question: z.string().optional(),
  answer: z.string().optional(),
  alternatives: alternativeSchema.array().optional(),
});

export const parseToQuestionDTO = questionSchema.parse;
export type QuestionDTO = z.infer<typeof questionSchema>;
export type AlternativeDTO = z.infer<typeof alternativeSchema>;
