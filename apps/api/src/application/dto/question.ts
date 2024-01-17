import { z } from "zod";

const questionSchema = z.object({
  order: z.number(),
  question: z.string().optional().nullable(),
  answerKey: z.string().optional().nullable(),
});

export const parseToQuestionDTO = questionSchema.parse;
export type QuestionDTO = z.infer<typeof questionSchema>;
