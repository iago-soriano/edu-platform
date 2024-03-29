import {
  IUseCase,
  UserSelectDTO,
  ICollectionParticipationsRepository,
} from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
};

type Return = void;

export type IUpdateNotificationConfigUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateNotificationConfigUseCase {
  constructor(
    private collectionParticipationsRepository: ICollectionParticipationsRepository
  ) {}

  async execute({ user, collectionId }: InputParams) {
    const collectionParticipation =
      await this.collectionParticipationsRepository.findByParticipantAndCollectionId(
        user.id,
        collectionId
      );
    if (!collectionParticipation)
      throw new Error("Usuário não participa da coleção");

    if (collectionParticipation.notifyOnActivityInsert) {
      await this.collectionParticipationsRepository.updateNotificationsSettings(
        user.id,
        collectionId,
        false
      );
    } else {
      await this.collectionParticipationsRepository.updateNotificationsSettings(
        user.id,
        collectionId,
        true
      );
    }
  }
}
export default UseCase;
