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

    const verifyingOriginatingVersion =
      await this.activitiesRepository.getVersionById(versionId);

    if (!verifyingOriginatingVersion) throw new ActivityVersionNotFound();

    const contentToBeDeleted = verifyingOriginatingVersion.contents.filter(
      (ct) => ct.id === contentId
    );

    if (contentToBeDeleted.length === 0) throw new ActivityContentNotFound();

    if (contentToBeDeleted[0].originatingVersionId === versionId) {
      if (
        (contentToBeDeleted[0].type === "Audio" ||
          contentToBeDeleted[0].type === "Image") &&
        contentToBeDeleted[0].content
      ) {
        this.storageService.deleteFile(contentToBeDeleted[0].content);
      }
      await this.activitiesRepository.deleteContentAndVersionRelation(
        contentId,
        versionId
      );
      await this.activitiesRepository.deleteContent(contentId);
    } else {
      await this.activitiesRepository.deleteContentAndVersionRelation(
        contentId,
        versionId
      );
    }
  }
}

export default UseCase;
