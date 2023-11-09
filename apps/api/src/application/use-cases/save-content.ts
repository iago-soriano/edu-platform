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
  }: InputParams) {
    // obter o version id do banco de dados, jogar um erro se não existir
    // se tiver um contentId, é edição. Pegar o que já existe. Se não existir, erro
    // se não tiver, é content novo
    // criar um objeto Content no domain, que nem o Activity, e fazer validações (inclusive do type)
    // persistir (editar ou inserir)

    return { contentId: 2 };
  }
}

export default UseCase;
