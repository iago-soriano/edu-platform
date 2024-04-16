import { IUseCase } from "@edu-platform/common/platform";
import {
  INotificationsRepository,
  UserSelectDTO,
} from "@application/interfaces";

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
      await this.notificationsRepository.findById(notificationId);

    if (!notification || notification.userId !== user.id)
      throw new Error("Notification not found");

    notification.setAsViewed();

    await this.notificationsRepository.save(notification);
  }
}

export default UseCase;
