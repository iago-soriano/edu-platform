import { UserIsNotDraftAuthor } from "@edu-platform/common";
import { Content, VersionStatus, Question } from "@domain";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";
import { IGetActivityUseCaseHelper } from "@use-case-middlewares";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
};

type Return = {
  title: string;
  description: string;
  status: VersionStatus;
  topics: string;
  elements?: { content?: Content; question?: Question }[];
};

export type IGetActivityVersionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetActivityVersionUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private getActivityHelper: IGetActivityUseCaseHelper
  ) {}

  async execute({ user, activityId, versionId }: InputParams) {
    const { version, activity } = await this.getActivityHelper.execute({
      activityId,
      versionId,
    });

    if (version.status == "Draft" && activity.authorId !== user.id)
      throw new UserIsNotDraftAuthor();

    const { contents, questions } =
      await this.activitiesRepository.Versions.findElementsByVersionId(
        version.id
      );

    const elements = [
      ...contents.map((content) => ({
        content,
        question: undefined,
      })),
      ...questions.map((question) => ({
        question,
        content: undefined,
      })),
    ].sort(
      (el1, el2) =>
        ((el1.content || el1.question).order || 0) -
        ((el2.content || el2.question).order || 0)
    );

    return {
      ...version,
      elements,
    };
  }
}

export default UseCase;
