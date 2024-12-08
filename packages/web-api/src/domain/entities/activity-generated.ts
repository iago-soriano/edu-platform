import { Entity, CollectionArray } from "@edu-platform/common/platform";
import {
  ActivityStatus,
  ActivityType,
  ActivityLevel,
  Languages,
  ActivityTopics,
} from "@edu-platform/common/domain/enums";
import { ActivityBlock } from "./activity-block";

export class ActivityGenerated extends Entity {
  constructor(
    public id: string,
    public language: Languages,
    public topics: ActivityTopics[],
    public type: ActivityType,
    public level: ActivityLevel,
    public status: ActivityStatus,
    public blocks: CollectionArray<ActivityBlock>
  ) {
    super();
  }

  setBlocks(blocks: ActivityBlock[]) {
    this.blocks = new CollectionArray(...blocks);
  }
}
