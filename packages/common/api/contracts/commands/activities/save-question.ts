import { z } from "zod";

const saveQuestionParamsSchema = z.object({
  activityId: z.string().uuid(),
});

type Params = z.infer<typeof saveQuestionParamsSchema>;

enum QuestionTypes {
  MultipleChoice = "MultipleChoice",
  Text = "Text",
}

const saveQuestionRequestSchema = z.object({
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

type RequestBody = z.infer<typeof saveQuestionRequestSchema>;

interface ResponseBody {
  questionId?: number;
}

export type {
  RequestBody as SaveQuestionRequestBody,
  ResponseBody as SaveQuestionResponseBody,
  Params as SaveQuestionParams,
};

export { saveQuestionParamsSchema, saveQuestionRequestSchema };
