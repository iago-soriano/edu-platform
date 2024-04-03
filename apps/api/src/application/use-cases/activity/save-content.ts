import {
  ActivityContentNotFound,
  ActivityNotFound,
  ActivityVersionIsNotDraft,
  ActivityVersionNotFound,
  ContentRequestDTO,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  IStorageService,
  IIdGenerator,
} from "@interfaces";
import { db } from "@infrastructure";

type InputParams = {
  contentDto: ContentRequestDTO;
  user: UserSelectDTO;
  activityId: string;
};

type Return = void;

export type ISaveContentUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveContentUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private storageService: IStorageService,
    private idService: IIdGenerator
  ) {}

  async execute({ contentDto, user, activityId }: InputParams) {
    const activity =
      await this.activitiesRepository.findRootByIdWithContents(activityId);
    if (!activity) throw new ActivityNotFound();

    activity.upsertContent(user, contentDto);

    await this.activitiesRepository.save(activity);

    // await db.transaction(async (tx) => {
    //   await Promise.all(
    //     activity
    //       .draftVersion!.elements.filter((el) => el.isInsert)
    //       .map((el) => this.activitiesRepository.Elements.insert(tx, el))
    //   );
    //   await Promise.all(
    //     activity
    //       .draftVersion!.elements.filter((el) => el.isUpdate)
    //       .map((el) => this.activitiesRepository.Elements.update(tx, el))
    //   );
    // });
  }
}
export default UseCase;
