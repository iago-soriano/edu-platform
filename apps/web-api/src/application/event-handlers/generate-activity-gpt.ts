import { IUseCase } from "@edu-platform/common/platform";
import { GenerateActivityGPTEvent } from "@edu-platform/common/domain/integration-events";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import {
  Activity,
  ActivityFormat,
  MIN_TEXT_LENGTH,
  MAX_TEXT_LENGTH,
  ActivityBlock,
} from "@domain/entities";
import {
  ActivityStatus,
  ActivityBlockType,
} from "@edu-platform/common/domain/domain/enums";
import { IActivitiesGeneratedRepository } from "../interfaces";
import { createId } from "@paralleldrive/cuid2";

export type IGenerateActivityUseCase = IUseCase<
  GenerateActivityGPTEvent["payload"],
  void
>;

class UseCase implements IGenerateActivityUseCase {
  constructor(
    private activitiesGeneratedRepository: IActivitiesGeneratedRepository
  ) {}

  async execute(payload: GenerateActivityGPTEvent["payload"]) {
    try {
      const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

      if (!payload.activityId) throw new Error("Payload has no activity id");

      const { activityId } = payload;

      const activity =
        await this.activitiesGeneratedRepository.findGeneratedActivityById(
          activityId
        );

      if (!activity)
        throw new Error(`Activity with id ${activityId} not found`);

      const { topics, language, type, level, status } = activity;

      if (status === ActivityStatus.READY)
        throw new Error("Activity is ready, cannot complete it again");

      const prompt = `
        Give me a language learning activity in ${language.toLocaleLowerCase()}. 
        It has to contain the format in activity_format, in which the text is a text between ${MIN_TEXT_LENGTH} and ${MAX_TEXT_LENGTH} words 
        on the topics ${topics.map((t) => t.toLocaleLowerCase()).join(", ")} and the level of dificulty of the words id ${level.toLocaleLowerCase()}.
        Also give me comprehension questions regarding the text you've made: give me an open-ended question and two multiple choice questions with thre alternatives each, 
        in which only one is correct. Also inform which alternative is the correct one in the field answer of each alternative.`;

      let completion = null;

      try {
        completion = await openai.beta.chat.completions.parse({
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
      if (!parsedResponse?.openQuestion?.length)
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

      const questionText = new ActivityBlock(
        createId(),
        ActivityBlockType.TEXT,
        parsedResponse?.text,
        activityId,
        null
      );
      const openQuestion = new ActivityBlock(
        createId(),
        ActivityBlockType.OPEN_QUESTION,
        parsedResponse?.openQuestion,
        activityId,
        null
      );

      activity.status = ActivityStatus.READY;
      activity.blocks.push();

      await this.activitiesGeneratedRepository.save(activity);
    } catch (error: any) {
      console.error(
        "There's been an error getting an output from ChatGPT",
        error
      );
    }
  }
}
export default UseCase;
