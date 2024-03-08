import {
  IUseCase,
  IActivitiesRepository,
  IStorageService,
  UserSelectDTO,
  ActivitySelectDTO,
  ActivityVersionSelectDTO,
} from "@interfaces";
import { VersionStatus, Content, ActivityVersion } from "@domain";
import {
  ActivityNotFound,
  ActivityVersionIsNotDraft,
  ActivityVersionNotFound,
} from "@edu-platform/common";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
};

type Return = void;

export type IDeleteVersionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IDeleteVersionUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, activityId, versionId }: InputParams) {
    const version = await this.activitiesRepository.Versions.findById(
      versionId,
      activityId
    );
    if (!version) throw new ActivityVersionNotFound();

    if (version.activity.author.id !== user.id) throw new ActivityNotFound();

    if (!(version.status === VersionStatus.Draft))
      throw new ActivityVersionIsNotDraft();

    // const { contents, questions } = v;
    const contents =
      await this.activitiesRepository.Contents.listByVersionId(versionId);

    for (let content of contents) {
      //   // see TODO of delete-content.ts use-case
      //   if (content.storedFileUrl()) {
      //     //await this.storageService.deleteFileByUrl(content.imageUrl);
      //   }

      await this.activitiesRepository.Contents.delete(content.id!);
    }

    // for (let question of questions) {
    //   await this.activitiesRepository.Questions.delete(question.id || 0);
    // }

    await this.activitiesRepository.Versions.delete(version.id!);

    version.activity.draftVersion = new ActivityVersion(0);
    await this.activitiesRepository.Activities.update(version.activity);
  }
}

export default UseCase;
