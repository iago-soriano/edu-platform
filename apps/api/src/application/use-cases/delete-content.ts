import { Content } from "@domain";
import {
  IUseCase,
  IActivitiesRepository,
  IStorageService,
  UserSelectDTO,
  ActivityVersionSelectDTO,
  ActivityContentSelectDTO,
} from "@interfaces";
import {
  IGetActivityUseCaseHelper,
  IValidateActivityUserRelationUseCaseMiddleware,
} from "application/use-case-middlewares";

type InputParams = {
  activityId: number;
  versionId: number;
  contentId: number;
  user: UserSelectDTO;
};

type Return = void;

export type IDeleteContentUseCase = IUseCase<InputParams, Return>;

class UseCase implements IDeleteContentUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private storageService: IStorageService,
    private getActivityHelper: IGetActivityUseCaseHelper,
    private validateActivityUserRelationUseCaseMiddleware: IValidateActivityUserRelationUseCaseMiddleware
  ) {}

  async execute({ user, activityId, versionId, contentId }: InputParams) {
    const { version, activity, content } = await this.getActivityHelper.execute(
      {
        activityId,
        versionId,
        contentId,
      }
    );

    await this.validateActivityUserRelationUseCaseMiddleware.execute({
      user,
      activity,
    });

    if (!content) return;
    return this.handle({ version, content });
  }

  async handle({
    content: dbDto,
    version,
  }: {
    content: ActivityContentSelectDTO;
    version: ActivityVersionSelectDTO;
  }) {
    const content = Content.mapFromDatabaseDto(dbDto);

    if (content.originatingVersionId !== version.id) {
      await this.activitiesRepository.VersionElements.delete(
        content.id || 0,
        version.id
      );
      return;
    }

    const fileUrl = content.storedFileUrl();
    if (fileUrl) {
      await this.storageService.deleteFileByUrl(fileUrl);
    }

    await this.activitiesRepository.VersionElements.delete(
      content.id || 0,
      version.id
    );
    await this.activitiesRepository.Contents.delete(content.id || 0);
  }
}

export default UseCase;
