import { Activity } from "@domain";
import { IUseCase, IActivitiesRepository } from "@interfaces";

type InputParams = {
  activityId: string;
};

type Return = {
  versionId: number;
};

export type ICreateNewActivityVersionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewActivityVersionUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ activityId: activityIdString }: InputParams) {
    const activityId = parseInt(activityIdString);

    const activityDbDto =
      await this.activitiesRepository.Activities.findById(activityId);
    const activity = Activity.mapFromDatabaseDto(activityDbDto);

    if (activity.hasDraft()) {
      return { versionId: activity.draftVersionId || 0 };
    } else {
      const { contents, questions } =
        await this.activitiesRepository.Versions.findElementsByVersionId(
          activity.lastVersionId || 0
        );

      // cria nova versão na atividade
      const { versionId } =
        await this.activitiesRepository.Versions.insert(activityId);

      // TEM QUE MUDAR A VERSION?

      // cria relações contents
      await Promise.all(
        contents.map(async (content) => {
          await this.activitiesRepository.VersionElements.insert(
            versionId,
            content.id,
            undefined
          );
        })
      );

      // cria relações questions
      await Promise.all(
        questions.map(async (question) => {
          await this.activitiesRepository.VersionElements.insert(
            versionId,
            undefined,
            question.id
          );
        })
      );

      await this.activitiesRepository.Activities.update(activityId, {
        draftVersionId: versionId,
      });

      return { versionId: versionId };
    }
  }
}

export default UseCase;
