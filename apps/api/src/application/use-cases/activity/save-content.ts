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
  }
}
export default UseCase;
