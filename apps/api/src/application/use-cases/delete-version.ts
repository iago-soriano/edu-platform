import {
  IUseCase,
  IActivitiesRepository,
  IStorageService,
  UserSelectDTO,
  ActivitySelectDTO,
  ActivityVersionSelectDTO,
} from "@interfaces";
import { IGetActivityUseCaseHelper } from "application/use-case-middlewares";
import { VersionStatus, Content } from "@domain";
import {
  ActivityNotFound,
  ActivityVersionIsNotDraft,
} from "@edu-platform/common";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
};

type Return = void;

export type IDeleteVersionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IDeleteVersionUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private storageService: IStorageService,
    private getActivityHelper: IGetActivityUseCaseHelper
  ) {}

  async execute({ user, activityId, versionId }: InputParams) {
    const { version, activity } = await this.getActivityHelper.execute({
      activityId,
      versionId,
    });

    if (activity.authorId !== user.id) throw new ActivityNotFound();

    if (!(version.status === VersionStatus.Draft))
      throw new ActivityVersionIsNotDraft();

    const { questions, contents: contentDtos } =
      await this.activitiesRepository.Versions.findElementsByVersionId(
        version.id
      );

    const contents = contentDtos.map((dto) => Content.mapFromDatabaseDto(dto));

    for (let content of contents) {
      // see TODO of delete-content.ts use-case
      if (content.storedFileUrl()) {
        //await this.storageService.deleteFileByUrl(content.imageUrl);
      }

      await this.activitiesRepository.Contents.delete(content.id || 0);
    }

    await this.activitiesRepository.Versions.delete(versionId);
    await this.activitiesRepository.Activities.update(activity.id, {
      draftVersionId: null,
    });

    // TODO verificar se é a única versão desta atividade (version = 0). Se sim deletar activity
    // OU: deixar a activity vazia por motivos de histórico
  }
}

export default UseCase;
