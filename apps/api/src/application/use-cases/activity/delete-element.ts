import {
  IUseCase,
  IActivitiesRepository,
  IStorageService,
  UserSelectDTO,
} from "@interfaces";
import {
  ActivityNotFound,
  ActivityVersionNotFound,
} from "@edu-platform/common";
import { db } from "@infrastructure";

type InputParams = {
  activityId: string;
  elementId: number;
  user: UserSelectDTO;
};

type Return = void;

export type IDeleteElementUseCase = IUseCase<InputParams, Return>;

class UseCase implements IDeleteElementUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository // private storageService: IStorageService
  ) {}

  async execute({ user, activityId, elementId }: InputParams) {
    const activity =
      await this.activitiesRepository.findRootByIdWithElements(activityId);
    if (!activity) throw new ActivityNotFound();

    activity.deleteElementOfDraft(user, elementId);

    await this.activitiesRepository.save(activity);
  }
}

export default UseCase;

// TODO: can't just delete the file, because this content might be a copy of an archived one.
// figure out a way to know if this file isn't being used elewhere
// const fileUrl = content.storedFileUrl();
// if (fileUrl) {
//await this.storageService.deleteFileByUrl(fileUrl);
//}
