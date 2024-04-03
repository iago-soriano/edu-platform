import {
  ActivityVersionIsNotDraft,
  ActivityNotFound,
} from "@edu-platform/common";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";
import { db } from "@infrastructure";

type InputParams = {
  user: UserSelectDTO;
  activityId: string;
  newValues: { title?: string; description?: string; topics?: string };
};

type Return = void;

export type IUpdateActivityMetadataUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateActivityMetadataUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, activityId, newValues }: InputParams) {
    const activity = await this.activitiesRepository.findRootById(activityId);
    if (!activity) throw new ActivityNotFound();

    activity.updateCurrentDraftMetadata(newValues, user);

    await this.activitiesRepository.save(activity);

    // await db.transaction(async (tx) => {
    //   await this.activitiesRepository.updateRoot(tx, activity);
    // });
  }
}

export default UseCase;
