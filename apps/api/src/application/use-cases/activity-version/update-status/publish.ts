import { Activity, ActivityVersion, VersionStatus, Content } from "@domain";
import {
  ActivityVersionHasNoContent,
  ActivityVersionHasNoTitleOrNoDescription,
  FailedToUpdateVersionStatus,
  ActivityNotFound,
  ContentIsHalfCompleted,
} from "@edu-platform/common/";
import {
  ActivitySelectDTO,
  IActivitiesRepository,
  IUseCase,
  UserSelectDTO,
  ActivityVersionSelectDTO,
} from "@interfaces";

export class HandlePublishDraft {
  constructor(private activitiesRepository: IActivitiesRepository) {}
  async execute(activity: Activity, version: ActivityVersion) {
    if (!activity.draftVersion) throw new Error("Draft version not found");

    // const v = await this.activitiesRepository.Versions.findFullViewById(
    //   version.id!
    // );
    // if (!v) throw new ActivityNotFound();

    // const { contents, questions } = v;

    const contents = await this.activitiesRepository.Contents.listByVersionId(
      version.id!
    );

    if (!contents || !contents.length) throw new ActivityVersionHasNoContent();

    if (!version.title || !version.description)
      throw new ActivityVersionHasNoTitleOrNoDescription();

    let contentCounter = contents.length;

    for (let content of contents) {
      if (content.isHalfCompleted())
        throw new ContentIsHalfCompleted(content.title, content.description);

      if (content.isEmpty()) {
        await this.activitiesRepository.Contents.delete(content.id || 0);
        contentCounter--;
      }
    }

    if (contentCounter === 0) throw new ActivityVersionHasNoContent();

    // TODO: when there is a read repo
    // for (let question of questions) {
    //   await this.activitiesRepository.Questions.delete(question.id || 0);
    // }

    // publish current draft
    activity.draftVersion.status = VersionStatus.Published;
    await this.activitiesRepository.Versions.update(activity.draftVersion);

    // archive currently published version
    if (activity.lastVersion) {
      activity.lastVersion.status = VersionStatus.Archived;
      await this.activitiesRepository.Versions.update(activity.lastVersion);
    }

    // update activity
    activity.lastVersion = new ActivityVersion(activity.draftVersion.id);
    activity.draftVersion = undefined;

    await this.activitiesRepository.Activities.update(activity);

    return {};
  }
}
