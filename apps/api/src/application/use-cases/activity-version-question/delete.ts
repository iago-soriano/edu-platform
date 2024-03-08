import { IUseCase, IActivitiesRepository, UserSelectDTO } from "@interfaces";
import {
  ActivityNotFound,
  ActivityVersionNotFound,
} from "@edu-platform/common";

type InputParams = {
  activityId: number;
  versionId: number;
  questionId: number;
  user: UserSelectDTO;
};

type Return = void;

export type IDeleteQuestionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IDeleteQuestionUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, activityId, versionId, questionId }: InputParams) {
    const version = await this.activitiesRepository.Versions.findById(
      versionId,
      activityId
    );
    if (!version) throw new ActivityVersionNotFound();
    if (version.activity.author.id !== user.id) throw new ActivityNotFound();

    const question =
      await this.activitiesRepository.Contents.findById(questionId);
    if (!question) return;

    if (version.activity.author.id !== user.id) throw new ActivityNotFound();

    await this.activitiesRepository.Questions.delete(question.id || 0);
  }
}

export default UseCase;
