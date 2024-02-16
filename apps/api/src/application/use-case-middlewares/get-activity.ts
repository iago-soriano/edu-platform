import { Content, ActivityVersion, Activity, Question } from "@domain";
import { IUseCase, IActivitiesRepository } from "@interfaces";
import {
  ActivityNotFound,
  ActivityVersionNotFound,
  ActivityContentNotFound,
  ActivityQuestionNotFound,
} from "@edu-platform/common";

type InputParams = {
  activityId: number;
  versionId: number;
  contentId?: number;
  questionId?: number;
};

type Return = {
  activity: Activity;
  version: ActivityVersion;
  content?: Content;
  question?: Question;
};

export type IGetActivityUseCaseHelper = IUseCase<InputParams, Return>;

class UseCase implements IGetActivityUseCaseHelper {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ activityId, versionId, contentId, questionId }: InputParams) {
    const activity =
      await this.activitiesRepository.Activities.findById(activityId);
    if (!activity) throw new ActivityNotFound();

    const version =
      await this.activitiesRepository.Versions.findSimpleViewById(versionId);
    if (!version) throw new ActivityVersionNotFound();

    if (version.activity.id !== activityId) throw new ActivityVersionNotFound();

    let content;

    if (contentId) {
      content = await this.activitiesRepository.Contents.findById(contentId);

      if (!content) throw new ActivityContentNotFound();
      if (content.version.id !== version.id)
        throw new ActivityContentNotFound();
    }

    let question;

    if (questionId) {
      question = await this.activitiesRepository.Questions.findById(questionId);

      if (!question) throw new ActivityQuestionNotFound();
      if (question.version.id !== version.id)
        throw new ActivityQuestionNotFound();
    }

    return {
      activity,
      version,
      content,
      question,
    };
  }
}

export default UseCase;
