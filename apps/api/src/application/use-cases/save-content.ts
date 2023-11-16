import { ContentTypeType, Content } from "@domain";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";

type InputParams = {
  title: string;
  content: string;
  description: string;
  type: ContentTypeType;
  contentId?: number;
  user: UserSelectDTO;
  activityVersionId: number;
};

type Return = {
  contentId?: number;
};

export type ISaveContentUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveContentUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({
    title,
    content,
    description,
    type,
    contentId,
    user,
    activityVersionId,
  }: InputParams) {
    // obter o version id do banco de dados, jogar um erro se não existir
    // se tiver um contentId, é edição. Pegar o que já existe. Se não existir, erro
    // se não tiver, é content novo
    // criar um objeto Content no domain, que nem o Activity, e fazer validações (inclusive do type)
    // persistir (editar ou inserir)

    const versionIdExists =
      await this.activitiesRepository.getActivityByVersionId(activityVersionId);

    if (!versionIdExists) throw new Error("Activity Version not found");

    Content.validateTitle(title); // por que reclamou quando os métodos não eram estáticos?
    Content.validateDescription(description);
    Content.validateContentType(type);

    const contentAlredyExists =
      await this.activitiesRepository.getActivityContentByContentId(contentId);

    if (!contentAlredyExists) {
      return this.activitiesRepository.insertContent({
        title,
        content,
        description,
        type,
        activityVersionId,
      });
    } else {
      await this.activitiesRepository.updateContent(contentId, {
        title,
        content,
        description,
        type,
        activityVersionId,
      });
    }
  }
}

export default UseCase;
