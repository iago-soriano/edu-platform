import { IUseCase } from "@edu-platform/common/platform";
import { IActivitiesRepository, UserSelectDTO } from "../../interfaces";
import { SilentInvalidStateError } from "@edu-platform/common";

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
    if (!activity) throw new SilentInvalidStateError("Activity not found");

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
