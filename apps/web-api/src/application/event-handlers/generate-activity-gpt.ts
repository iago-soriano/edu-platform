import { IUseCase } from "@edu-platform/common/platform";
import { GenerateActivityGPTEvent } from "@edu-platform/common/domain/integration-events";
import {
  ActivityStatus,
  ActivityType,
} from "@edu-platform/common/domain/enums";
import { IActivitiesGeneratedRepository } from "../interfaces";
import { IActivityGenerator } from "./interfaces";

export type IGenerateActivityUseCase = IUseCase<
  GenerateActivityGPTEvent["payload"],
  void
>;

class UseCase implements IGenerateActivityUseCase {
  constructor(
    private activitiesGeneratedRepository: IActivitiesGeneratedRepository,
    private readingStrategy: IActivityGenerator
  ) {}

  async execute(payload: GenerateActivityGPTEvent["payload"]) {
    try {
      if (!payload.activityId) throw new Error("Payload has no activity id");

      const { activityId } = payload;

      const activityGenerated =
        await this.activitiesGeneratedRepository.findGeneratedActivityById(
          activityId
        );

      if (!activityGenerated)
        throw new Error(`Activity with id ${activityId} not found`);

      const { status, type } = activityGenerated;

      if (status === ActivityStatus.READY)
        throw new Error("Activity is ready, cannot complete it again");

      const strategiesByType: { [key in ActivityType]: IActivityGenerator } = {
        [ActivityType.READING]: this.readingStrategy,
        [ActivityType.LISTENING]: this.readingStrategy, //TODO
      };

      const result = await strategiesByType[type].execute({
        activityId,
        activityGenerated,
      });

      await this.activitiesGeneratedRepository.save(result);
    } catch (error: any) {
      console.error(
        "There's been an error getting an output from ChatGPT",
        error
      );
    }
  }
}

export default UseCase;
