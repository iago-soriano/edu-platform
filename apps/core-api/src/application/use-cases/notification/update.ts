import { IUseCase } from "@edu-platform/common/platform";
import {
  INotificationsRepository,
  UserSelectDTO,
} from "@application/interfaces";
import { SilentInvalidStateError } from "@edu-platform/common";

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
      throw new SilentInvalidStateError(
        `Notification with id ${notificationId} not found or user id does not match`
      );

    notification.setAsViewed();

    await this.notificationsRepository.save(notification);
  }
}

export default UseCase;
