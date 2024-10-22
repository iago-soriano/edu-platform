import OpenAI from "openai";
import {
  ActivityFormat,
  ActivityBlock,
  multiple_choice_question_count,
  open_question_count,
} from "@domain/entities";
import { createId } from "@paralleldrive/cuid2";
import { zodResponseFormat } from "openai/helpers/zod";
import {
  ActivityStatus,
  ActivityBlockType,
} from "@edu-platform/common/domain/enums";
import { DomainRules } from "@edu-platform/common/domain/rules";
import { IActivityGenerator, ActivityGeneratorInputParams } from "./interfaces";

class GenerateReadingActivity implements IActivityGenerator {
  private _openAiApi;

  constructor() {
    this._openAiApi = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });
  }

  async execute({
    activityGenerated,
    activityId,
  }: ActivityGeneratorInputParams) {
    let completion = null;
    const { topics, language, level } = activityGenerated;

    const openQuestionsCount = open_question_count[level];
    const multipleChoiceQuestionCount = multiple_choice_question_count[level];
    const wordCount = 800;

    const promptIntro = `You are a language teacher writing a comprehension actiity. Fill activity_format in ${language.toLocaleLowerCase()}.`;
    const step1 = `Step 1: 'text' is a text of ${wordCount} words on the topics ${topics.map((t) => t.toLocaleLowerCase()).join(", ")} and vocabulary dificulty of ${level.toLocaleLowerCase()}. Structure the text into 3 separate paragraphs, being: introduction, text body and conclusion.`;
    const step2 = `Step 2: openQuestions is ${openQuestionsCount} comprehension questions regarding the text you've made, between ${DomainRules.ACTIVITY_BLOCKS.OPEN_QUESTION.MIN_LENGTH_CHARACTERS} and ${DomainRules.ACTIVITY_BLOCKS.OPEN_QUESTION.MAX_LENGTH_CHARACTERS} characters.`;
    const step3 = `Step 3: ${multipleChoiceQuestionCount} multiple choice questions with thre alternatives each, in which only one is correct. Also inform which alternative is the correct one in the field answer of each alternative.`;

    const prompt = [promptIntro, step1, step2, step3].join("");

    try {
      completion = await this._openAiApi.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: zodResponseFormat(ActivityFormat, "activity_format"),
      });
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data);
      } else {
        throw new Error(error.message);
      }
    }

    const parsedResponse = completion.choices[0].message.parsed;

    if (!parsedResponse?.text?.length)
      console.error(
        "There was an error generating the activity: TEXT came empty"
      );
    if (!parsedResponse?.openQuestions?.length)
      console.error(
        "There was an error generating the activity: OPEN_QUESTION came empty"
      );
    if (!parsedResponse?.multipleChoiceQuestions?.length)
      console.error(
        "There was an error generating the activity: MULTIPLE_CHOICE_QUESTION came empty"
      );
    if (
      !parsedResponse?.multipleChoiceQuestions?.every(
        (mcq) => mcq.alternatives.length && mcq.correctAnswer && mcq.question
      )
    )
      console.error(
        "There was an error generating the activity: some MULTIPLE_CHOICE_QUESTION came in the wrong format"
      );

    const text = new ActivityBlock(
      createId(),
      ActivityBlockType.TEXT,
      parsedResponse?.text,
      activityId,
      null
    );

    const openQuestions =
      parsedResponse?.openQuestions.map(
        (oq) =>
          new ActivityBlock(
            createId(),
            ActivityBlockType.OPEN_QUESTION,
            oq,
            activityId,
            null
          )
      ) ?? [];

    const multipleChoiceQuestions =
      parsedResponse?.multipleChoiceQuestions.map(
        (mcq) =>
          new ActivityBlock(
            createId(),
            ActivityBlockType.MULTIPLE_CHOICE_QUESTION,
            {
              ...mcq,
              correctAnswer: mcq.alternatives.findIndex(
                (alt) => alt === mcq.correctAnswer
              ),
            },
            activityId,
            null
          )
      ) ?? [];

    activityGenerated.status = ActivityStatus.READY;
    activityGenerated.setBlocks([
      text,
      ...openQuestions,
      ...multipleChoiceQuestions,
    ]);

    return activityGenerated;
  }
}

export default GenerateReadingActivity;
