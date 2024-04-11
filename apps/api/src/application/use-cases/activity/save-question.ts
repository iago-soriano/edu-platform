import {
  QuestionRequestDTO,
  SilentInvalidStateError,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
} from "@application/interfaces";

type InputParams = {
  questionDto: QuestionRequestDTO;
  user: UserSelectDTO;
  activityId: string;
};

type Return = void;

export type ISaveQuestionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveQuestionUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ questionDto, user, activityId }: InputParams) {
    const activity =
      await this.activitiesRepository.findRootByIdWithElements(activityId);
    if (!activity)
      throw new SilentInvalidStateError(
        `Activity with id ${activityId} not found`
      );

    activity.upsertQuestion(user, questionDto);

    await this.activitiesRepository.save(activity);
  }
}
export default UseCase;
