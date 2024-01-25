import {
  IUseCase,
  IActivitiesRepository,
  ActivitySelectDTO,
  ActivityVersionSelectDTO,
  ActivityContentSelectDTO,
  QuestionSelectDTO,
} from "@interfaces";
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
  activity: ActivitySelectDTO;
  version: ActivityVersionSelectDTO;
  content?: ActivityContentSelectDTO;
  question?: QuestionSelectDTO;
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

    if (version.activityId !== activityId) throw new ActivityVersionNotFound();

    let content;

    if (contentId) {
      content = await this.activitiesRepository.Contents.findById(contentId);

      if (!content) throw new ActivityContentNotFound();
      if (content.versionId !== version.id) throw new ActivityContentNotFound();
    }

    let question;

    if (questionId) {
      question = await this.activitiesRepository.Questions.findById(questionId);

      if (!question) throw new ActivityQuestionNotFound();
      if (question.versionId !== version.id)
        throw new ActivityContentNotFound();
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
