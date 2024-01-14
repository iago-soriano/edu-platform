import { Activity } from "@domain";
import { IUseCase, IActivitiesRepository } from "@interfaces";

type InputParams = {
  activityId: string;
};

type Return = {
  versionId?: number;
};

export type ICreateNewActivityVersionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewActivityVersionUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ activityId: activityIdString }: InputParams) {
    const activityId = parseInt(activityIdString);

    const activity =
      await this.activitiesRepository.findActivityById(activityId);

    if (Activity.hasDraft(activity.draftVersionId)) {
      return { versionId: activity.draftVersionId };
    } else {
      const versionToBeDuplicated =
        await this.activitiesRepository.findVersionById(activity.lastVersionId);

      // cria nova versão na atividade
      const { versionId } =
        await this.activitiesRepository.insertVersion(activityId);

      // TEM QUE MUDAR A VERSION?

      // cria relações contents
      await Promise.all(
        versionToBeDuplicated.contents.map(async (content) => {
          await this.activitiesRepository.insertRelationBetweenVersionAndElement(
            versionId,
            content.id,
            undefined
          );
        })
      );

      // cria relações questions
      await Promise.all(
        versionToBeDuplicated.questions.map(async (question) => {
          await this.activitiesRepository.insertRelationBetweenVersionAndElement(
            versionId,
            undefined,
            question.id
          );
        })
      );

      await this.activitiesRepository.updateActivity(activityId, {
        draftVersionId: versionId,
      });

      return { versionId };
    }
  }
}

export default UseCase;
