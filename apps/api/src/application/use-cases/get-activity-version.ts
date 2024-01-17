import { Content, VersionStatus } from "@domain";
import { ElementDTO, parseVersionStatus } from "@dto";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  ActivitySelectDTO,
  ActivityVersionSelectDTO,
} from "@interfaces";
import {
  IGetActivityUseCaseHelper,
  IValidateActivityUserRelationUseCaseMiddleware,
} from "application/use-case-middlewares";

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
    private getActivityHelper: IGetActivityUseCaseHelper,
    private validateActivityUserRelationUseCaseMiddleware: IValidateActivityUserRelationUseCaseMiddleware
  ) {}

  async execute({ user, activityId, versionId }: InputParams) {
    const { version, activity } = await this.getActivityHelper.execute({
      activityId,
      versionId,
    });

    await this.validateActivityUserRelationUseCaseMiddleware.execute({
      user,
      activity,
    });

    return this.handle({ user, activity, version });
  }

  async handle({
    user,
    version,
    activity,
  }: {
    user: UserSelectDTO;
    activity: ActivitySelectDTO;
    version: ActivityVersionSelectDTO;
  }) {
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

    if (version.status == "Draft" && activity.authorId !== user.id)
      throw new Error("Non-author cannot get draft version");

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
