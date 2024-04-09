import { Notification } from "@domain";
import { ActivityNotFound } from "@edu-platform/common/";
import {
  ActivitySelectDTO,
  IActivitiesRepository,
  IUseCase,
  UserSelectDTO,
} from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  activityId: string;
};

type Return = void;

export type IPublishDraftUseCase = IUseCase<InputParams, Return>;

class UseCase implements IPublishDraftUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}
  async execute({ user, activityId }: InputParams) {
    const activity =
      await this.activitiesRepository.findRootByIdWithContents(activityId);
    if (!activity) throw new ActivityNotFound();

    activity.publishCurrentDraft(user);

    await this.activitiesRepository.save(activity);

    // TODO: send domain event
    // const usersToBeNotified =
    //   await this.collectionParticipationsRepository.findParticipantsToBeNotified(
    //     activity.collection.id
    //   );

    // usersToBeNotified.map(async (user) => {
    //   const notification = new Notification();
    //   notification.buildActivityPublishedNotification(
    //     version.id!,
    //     activity.collection.name!,
    //     version.title,
    //     user.userId
    //   );

    //   await this.notificationsRepository.insert(notification);
    // });
  }
}
export default UseCase;
