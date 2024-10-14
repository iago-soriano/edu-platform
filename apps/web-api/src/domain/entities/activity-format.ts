import { z } from "zod";

export const ActivityFormat = z.object({
  text: z.string(),
  openQuestions: z.string().array(),
  multipleChoiceQuestions: z
    .object({
      question: z.string(),
      alternatives: z.string().array(),
      correctAnswer: z.string(),
    })
    .array(),
});
