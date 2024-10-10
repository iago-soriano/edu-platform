import { Entity } from "@edu-platform/common/platform";
import {
  ActivityStatus,
  ActivityType,
  ActivityLevel,
  Languages,
} from "@edu-platform/common/domain/domain/enums";
import { ActivityBlock } from "./activity-block";

export class ActivityGenerated extends Entity {
  public blocks: ActivityBlock[] = [];
  constructor(
    public id: string,
    public language: Languages,
    public topics: string[],
    public type: ActivityType,
    public level: ActivityLevel,
    public status: ActivityStatus
  ) {
    super();
  }
}
