import { Activity } from "@domain";
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
    const activityDbDto =
      await this.activitiesRepository.Activities.findById(activityId);
    const activity = Activity.mapFromDatabaseDto(activityDbDto);

    if (activity.authorId !== user.id) throw new ActivityNotFound();

    if (activity.hasDraft())
      // there is already a draft in progress. Let user know that. TODO: send this endpoint a "forceDelete" flag and delete the other draft here
      return { versionId: activity.draftVersionId || 0 };

    const { contents, questions, version } =
      await this.activitiesRepository.Versions.findFullViewById(
        activity.lastVersionId || 0
      );

    // cria nova versão na atividade, com um número de versão novo
    const { versionId: newVersionId } =
      await this.activitiesRepository.Versions.insert(
        activityId,
        (version.version || 0) + 1
      );

    // duplicate all contents and questions to the new version
    await Promise.all(
      contents.map((content) =>
        this.activitiesRepository.Contents.insert({
          ...content,
          versionId: newVersionId,
        })
      )
    );
    // await Promise.all(questions.map(question => this.activitiesRepository.Questions.insert({...question, versionId: newVersionId})));

    await this.activitiesRepository.Activities.update(activityId, {
      draftVersionId: newVersionId,
    });

    return { versionId: newVersionId };
  }
}

export default UseCase;
