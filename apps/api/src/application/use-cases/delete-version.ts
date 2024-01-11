import {
  ActivityContentNotFound,
  ActivityIsNotDraft,
  ActivityVersionNotFound,
} from "@edu-platform/common";
import { IUseCase, IActivitiesRepository, IStorageService } from "@interfaces";

type InputParams = {
  activityId: string;
  versionId: string;
};

type Return = void;

export type IDeleteVersionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IDeleteVersionUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private storageService: IStorageService
  ) {}

  async execute({
    activityId: activityIdString,
    versionId: versionIdString,
  }: InputParams) {
    const activityId = parseInt(activityIdString);
    const versionId = parseInt(versionIdString);

    const version = await this.activitiesRepository.getVersionById(versionId);

    if (!version) throw new ActivityVersionNotFound();

    const activityVersionIsDraft = version.version.status === "Draft";

    if (!activityVersionIsDraft) throw new ActivityIsNotDraft();

    const contentsToBeDeleted = version.contents.filter(
      (ct) => ct.originatingVersionId === versionId
    );

    for (let content of contentsToBeDeleted) {
      if (
        content.type === "Image" &&
        content.imageUrl &&
        content.parentId === null
      ) {
        await this.storageService.deleteFile(content.imageUrl);
      } else if (
        content.type === "Image" &&
        content.imageUrl &&
        content.parentId !== null
      ) {
        const parentVersion =
          await this.activitiesRepository.getActivityContentByContentId(
            content.parentId
          );

        const parentImageUrlKeyName = parentVersion.imageUrl
          .split("/")[3]
          .concat("/", parentVersion.imageUrl.split("/")[4]);

        const contentImageUrlKeyName = content.imageUrl
          .split("/")[3]
          .concat("/", content.imageUrl.split("/")[4]);

        if (parentImageUrlKeyName !== contentImageUrlKeyName) {
          await this.storageService.deleteFile(content.imageUrl);
        }
      }
      await this.activitiesRepository.deleteContentVersionRelation(
        content.id,
        versionId
      );
      await this.activitiesRepository.deleteContent(content.id);
    }

    await this.activitiesRepository.updateActivityMetadata(activityId, {
      draftVersionId: null,
    });

    // verificar se é a única versão dessa atividade (version = 0). Se sim deletar version
  }
}

export default UseCase;
