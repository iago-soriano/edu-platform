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

    if (activity.authorId !== user.id) throw new ActivityNotFound();

    if (activity.hasDraft())
      // there is already a draft in progress. Let user know that. TODO: send this endpoint a "forceDelete" flag and delete the other draft here
      return { versionId: activity.draftVersionId || 0 };

    const fullVersion =
      await this.activitiesRepository.Versions.findFullViewById(
        activity.lastVersionId || 0
      );

    if (!fullVersion) throw new Error("Activity has no draft nor lastVersion");

    const { version, contents, questions } = fullVersion;

    // cria nova versão na atividade, com um número de versão novo
    const { versionId: newVersionId } =
      await this.activitiesRepository.Versions.insert(
        activityId,
        (version.version || 0) + 1
      );

    // duplicate all contents and questions to the new version
    await Promise.all(
      contents.map((content) => {
        content.versionId = newVersionId;
        this.activitiesRepository.Contents.insert(content);
      })
    );
    await Promise.all(
      questions.map((question) => {
        question.versionId = newVersionId;
        this.activitiesRepository.Questions.insert(question);
      })
    );

    await this.activitiesRepository.Activities.update(activityId, {
      draftVersionId: newVersionId,
    });

    return { versionId: newVersionId };
  }
}

export default UseCase;
