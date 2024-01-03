import {
  ActivityContentNotFound,
  ActivityVersionNotFound,
} from "@edu-platform/common";
import { IUseCase, IActivitiesRepository, IStorageService } from "@interfaces";

type InputParams = {
  versionId: string;
  contentId: string;
};

type Return = void;

export type IDeleteContentUseCase = IUseCase<InputParams, Return>;

class UseCase implements IDeleteContentUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private storageService: IStorageService
  ) {}

  async execute({
    versionId: versionIdString,
    contentId: contentIdString,
  }: InputParams) {
    const contentId = parseInt(contentIdString);
    const versionId = parseInt(versionIdString);

    const version = await this.activitiesRepository.getVersionById(versionId);

    if (!version) throw new ActivityVersionNotFound();

    const contentToBeDeleted = version.contents.filter(
      (ct) => ct.id === contentId
    )[0];

    if (!contentToBeDeleted) throw new ActivityContentNotFound();

    if (contentToBeDeleted.originatingVersionId !== versionId) {
      await this.activitiesRepository.deleteContentVersionRelation(
        contentId,
        versionId
      );
      return;
    }

    if (contentToBeDeleted.type === "Image" && contentToBeDeleted.imageUrl) {
      this.storageService.deleteFile(contentToBeDeleted[0].content);
    }

    await this.activitiesRepository.deleteContentVersionRelation(
      contentId,
      versionId
    );
    await this.activitiesRepository.deleteContent(contentId);
  }
}

export default UseCase;
