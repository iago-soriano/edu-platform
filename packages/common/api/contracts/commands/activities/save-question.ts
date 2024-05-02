import { z } from "zod";

enum QuestionTypes {
  MultipleChoice = "MultipleChoice",
  Text = "Text",
}

const questionRequestSchema = z.object({
  id: z.number().optional(),

  type: z.nativeEnum(QuestionTypes),
  question: z.string().optional(),
  description: z.string().optional(),
  answer: z.string().optional(),
  alternatives: z
    .array(
      z.object({
        id: z.number().optional(),
        text: z.string().optional(),
        comment: z.string().optional(),
        isCorrect: z.boolean().optional(),
      })
    )
    .optional(),
});

export const parseToQuestionRequestDTO = questionRequestSchema.parse;
export type QuestionRequestDTO = z.infer<typeof questionRequestSchema>;

type ResponseBody = {
  questionId?: number;
};
type Params = { activityId: string };

export type {
  QuestionRequestDTO as SaveQuestionRequestBody,
  ResponseBody as SaveQuestionResponseBody,
  Params as SaveQuestionParams,
};
