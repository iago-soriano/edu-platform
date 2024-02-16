import {
  ActivityQuestionNotFound,
  ActivityNotFound,
  ActivityVersionIsNotDraft,
} from "@edu-platform/common";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";
import { MultipleChoiceQuestion, Question, VersionStatus } from "@domain";
import { IGetActivityUseCaseHelper } from "@use-case-middlewares";

type InputParams = {
  question: Question;
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
};

type Return = void;

export type ISaveQuestionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveQuestionUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private getActivityHelper: IGetActivityUseCaseHelper
  ) {}

  async execute({ question, user, activityId, versionId }: InputParams) {
    const { version, activity } = await this.getActivityHelper.execute({
      activityId,
      versionId,
      questionId: question.id,
    });

    if (activity.author.id !== user.id) throw new ActivityNotFound();

    if (version.status !== VersionStatus.Draft)
      throw new ActivityVersionIsNotDraft();

    // new question
    if (!question.id) {
      // validate incoming content
      question.validateAnswer();
      question.validateQuestionText();

      // persist it
      await this.activitiesRepository.Questions.insert(question);

      return;
    }

    // find by id
    const existingQuestion = await this.activitiesRepository.Questions.findById(
      question.id
    );
    if (!existingQuestion) throw new ActivityQuestionNotFound();

    existingQuestion.merge(question);

    await this.activitiesRepository.Questions.update(
      question.id,
      existingQuestion
    );
  }
}
export default UseCase;
