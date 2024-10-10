import { ActivityBlockType } from "@edu-platform/common/domain/domain/enums";
import { Entity } from "@edu-platform/common/platform";

export class ActivityBlock extends Entity {
  constructor(
    public id: string,
    public type: ActivityBlockType,
    public data: any,
    public activityGeneratedId: string | null,
    public activityId: string | null
  ) {
    super();
  }
}
