import {
  ActivityIsNotDraft,
  ActivityVersionNotFound,
} from "@edu-platform/common";
import {
  IUseCase,
  IActivitiesRepository,
  IStorageService,
  UserSelectDTO,
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

type Return = void;

export type IDeleteVersionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IDeleteVersionUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private storageService: IStorageService,
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

    return this.handle({ activity, version });
  }

  async handle({
    activity,
    version,
  }: {
    activity: ActivitySelectDTO;
    version: ActivityVersionSelectDTO;
  }) {
    if (!(version.status === "Draft")) throw new ActivityIsNotDraft();
    const { questions, contents } =
      await this.activitiesRepository.Versions.findElementsByVersionId(
        version.id
      );

    const contentsToBeDeleted = contents.filter(
      (ct) => ct.originatingVersionId === version.id
    );

    for (let content of contentsToBeDeleted) {
      if (
        content.type === "Image" &&
        content.imageUrl &&
        content.parentId === null
      ) {
        await this.storageService.deleteFileByUrl(content.imageUrl);
      } else if (
        content.type === "Image" &&
        content.imageUrl &&
        content.parentId !== null
      ) {
        const parentVersion = await this.activitiesRepository.Contents.findById(
          content.parentId
        );

        const parentImageUrlKeyName = (parentVersion?.imageUrl || "")
          .split("/")[3]
          .concat("/", (parentVersion.imageUrl || "").split("/")[4]);

        const contentImageUrlKeyName = content.imageUrl
          .split("/")[3]
          .concat("/", content.imageUrl.split("/")[4]);

        if (parentImageUrlKeyName !== contentImageUrlKeyName) {
          await this.storageService.deleteFileByUrl(content.imageUrl);
        }
      }
      await this.activitiesRepository.VersionElements.delete(
        content.id,
        version.id
      );
      await this.activitiesRepository.Contents.delete(content.id);
    }

    await this.activitiesRepository.Activities.update(activity.id, {
      draftVersionId: null,
    });

    // verificar se é a única versão dessa atividade (version = 0). Se sim deletar version
  }
}

export default UseCase;
