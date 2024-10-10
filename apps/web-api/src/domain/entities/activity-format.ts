import { z } from "zod";

export const ActivityFormat = z.object({
  text: z.string(),
  openQuestion: z.string().array(),
  multipleChoiceQuestions: z
    .object({
      question: z.string(),
      alternatives: z.string().array(),
      correctAnswer: z.string(),
    })
    .array(),
});

export const MIN_TEXT_LENGTH = 100;
export const MAX_TEXT_LENGTH = 300;
