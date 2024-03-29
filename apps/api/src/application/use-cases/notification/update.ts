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
    const notification =
      await this.notificationsRepository.getNotificationById(notificationId);

    if (!notification || notification.userId !== user.id)
      throw new Error(" Notification not found");

    await this.notificationsRepository.update(notificationId, false);
  }
}

export default UseCase;
