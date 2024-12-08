import { z } from "zod";
import { ActivityLevel } from "@edu-platform/common/domain/enums";

export const multiple_choice_question_count: {
  [key in ActivityLevel]: number;
} = {
  [ActivityLevel.BASIC]: 2,
  [ActivityLevel.INTERMEDIATE]: 3,
  [ActivityLevel.ADVANCED]: 3,
};

export const open_question_count: { [key in ActivityLevel]: number } = {
  [ActivityLevel.BASIC]: 1,
  [ActivityLevel.INTERMEDIATE]: 2,
  [ActivityLevel.ADVANCED]: 2,
};

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
