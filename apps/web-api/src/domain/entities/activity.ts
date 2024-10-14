import { Entity, CollectionArray } from "@edu-platform/common/platform";
import { ActivityBlock } from "./activity-block";

export class Activity extends Entity {
  constructor(
    public id: string,
    public requestingUserId: string,
    public activityGeneratedId: string,
    public title: string,
    public blocks: CollectionArray<ActivityBlock>
  ) {
    super();
  }
}
