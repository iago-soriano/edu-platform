import { ActivityVersion } from "@domain";
import { IUseCase, IActivitiesRepository, UserSelectDTO } from "@interfaces";
import { ActivityNotFound } from "@edu-platform/common";

type InputParams = {
  activityId: number;
  user: UserSelectDTO;
};

type Return = {
  versionId: number;
};

export type ICreateNewDraftVersionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewDraftVersionUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ activityId, user }: InputParams) {
    const activity =
      await this.activitiesRepository.Activities.findById(activityId);

    if (!activity) throw new ActivityNotFound();

    if (!activity.lastVersion) throw new Error("Published version not found");

    if (activity.author.id !== user.id) throw new ActivityNotFound();

    if (activity.draftVersion)
      // there is already a draft in progress. Let user know that. TODO: send this endpoint a "forceDelete" flag and delete the other draft here
      return { versionId: activity.draftVersion.id || 0 };

    const publishedVersion = await this.activitiesRepository.Versions.findById(
      activity.lastVersion.id!,
      activityId
    );

    if (!publishedVersion) throw new Error("Full view not found"); // TODO: better understand how we could get here

    // cria nova versão na atividade, com um número de versão novo
    publishedVersion.version++;
    const { versionId: newVersionId } =
      await this.activitiesRepository.Versions.insert(publishedVersion);

    const contents = await this.activitiesRepository.Contents.listByVersionId(
      activity.lastVersion.id!
    );

    // duplicate all contents and questions to the new version
    await Promise.all(
      contents.map((content) => {
        content.version.id = newVersionId;
        this.activitiesRepository.Contents.insert(content);
      })
    );
    // TODO
    // await Promise.all(
    //   questions.map((question) => {
    //     question.version.id = newVersionId;
    //     this.activitiesRepository.Questions.insert(question);
    //   })
    // );

    activity.draftVersion = new ActivityVersion(newVersionId);
    await this.activitiesRepository.Activities.update(activity);

    return { versionId: newVersionId };
  }
}

export default UseCase;
