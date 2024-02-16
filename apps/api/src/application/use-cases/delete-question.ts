import { IUseCase, IActivitiesRepository, UserSelectDTO } from "@interfaces";
import { IGetActivityUseCaseHelper } from "@use-case-middlewares";
import { ActivityNotFound } from "@edu-platform/common";

type InputParams = {
  activityId: number;
  versionId: number;
  questionId: number;
  user: UserSelectDTO;
};

type Return = void;

export type IDeleteQuestionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IDeleteQuestionUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private getActivityHelper: IGetActivityUseCaseHelper
  ) {}

  async execute({ user, activityId, versionId, questionId }: InputParams) {
    const { activity, question } = await this.getActivityHelper.execute({
      activityId,
      versionId,
      questionId,
    });

    if (!question) return;
    if (activity.author.id !== user.id) throw new ActivityNotFound();

    await this.activitiesRepository.Questions.delete(question.id || 0);
  }
}

export default UseCase;
