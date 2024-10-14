import { IUseCase } from "@edu-platform/common/platform";
import { ActivityGenerated } from "@domain/entities";

export type ActivityGeneratorInputParams = {
  activityId: string;
  activityGenerated: ActivityGenerated;
};
export type IActivityGenerator = IUseCase<
  ActivityGeneratorInputParams,
  ActivityGenerated
>;
