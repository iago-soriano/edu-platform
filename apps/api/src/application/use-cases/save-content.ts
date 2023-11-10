import {
  ITopicsRepository,
  IActivitiesRepository,
} from "./../../interfaces/repositories";
import { IUseCase, UserSelectDTO } from "@interfaces";

type InputParams = {
  title: string;
  content: string;
  description: string;
  type: number[];
  contentId?: number;
  user: UserSelectDTO;
  activityVersionId: number;
};

type Return = {
  contentId?: number;
};

export type ISaveContentUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveContentUseCase {
  constructor(
    private topicsRepository: ITopicsRepository,
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute({
    title,
    content,
    description,
    type,
    contentId,
    user,
    activityVersionId
  }: InputParams) {
    // obter o version id do banco de dados, jogar um erro se não existir
    // se tiver um contentId, é edição. Pegar o que já existe. Se não existir, erro
    // se não tiver, é content novo
    // criar um objeto Content no domain, que nem o Activity, e fazer validações (inclusive do type)
    // persistir (editar ou inserir)

    const versionIdExists = await this.activitiesRepository.getActivityByVersionId(activityVersionId)

    if (!versionIdExists) throw new Error("Activity Version not found")

    const contentAlredyExists = await this.activitiesRepository.getActivityContentByContentId(contentId)

    //const contentType = 

    /* if (!contentAlredyExists) {
      await this.activitiesRepository.insertContent({ 
        title,
        content,
        description
      })
    }
 */
    return { contentId: 2 };
  }
}

export default UseCase;
