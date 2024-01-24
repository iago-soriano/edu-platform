import { UserIsNotDraftAuthor } from "./../../../../../packages/common/errors/domain/version";
import { Content, VersionStatus, Question } from "@domain";
import { ElementDTO, parseVersionStatus } from "@dto";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  ActivitySelectDTO,
  ActivityVersionSelectDTO,
} from "@interfaces";
import { IGetActivityUseCaseHelper } from "application/use-case-middlewares";

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
  elements?: ElementDTO[];
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
      ...contents.map((c) => ({
        content: Content.mapFromDatabaseDtoToRegularDto(c),
        question: null,
      })),
      ...questions.map((q) => ({
        question: { ...q, order: q.order || 0 },
        content: null,
      })),
    ].sort(
      (el1, el2) =>
        ((el1.content || el1.question).order || 0) -
        ((el2.content || el2.question).order || 0)
    );

    return {
      id: version.id || 0,
      title: version.title || "",
      description: version.description || "",
      status: parseVersionStatus(version.status) || "",
      topics: version.topics || "",
      elements,
    };
  }
}

export default UseCase;
