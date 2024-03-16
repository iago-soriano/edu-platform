import { INotificationsRepository, IUseCase, UserSelectDTO } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  notificationId: number;
};

type Return = void;

export type IUpdateNotificationUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateNotificationUseCase {
  constructor(private notificationsRepository: INotificationsRepository) {}

  async execute({ user, notificationId }: InputParams) {
    // TODO pegar a notificação pelo id e pelo id do usuário

    await this.notificationsRepository.update(notificationId, false);
  }
}

export default UseCase;
