import { IUseCase, UserSelectDTO, ICollectionsRepository } from "@interfaces";
import { Collection, User } from "@domain";

type InputParams = User;

type Return = void;

export type IInsertDefaultCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IInsertDefaultCollectionUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute(user: InputParams) {
    const defaultCollection = new Collection();
    defaultCollection.name = "Minha coleção";
    defaultCollection.description =
      "Esta é sua primeira coleção! Altere seu nome e descrição para refletir o objetivo desta coleção, e, então, insira estudantes";
    defaultCollection.notifyOwnerOnStudentOutput = true;
    defaultCollection.isPrivate = true;
    defaultCollection.owner = user;

    this.collectionsRepository.insert(defaultCollection);
  }
}

export default UseCase;
