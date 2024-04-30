import { Entity } from "@edu-platform/common/platform";
import { ParticipationType } from "./enums";

export class CollectionParticipation extends Entity {
  public userId: string = "0";
  public collectionId: number = 0;
  public type: ParticipationType;
  public notifyOnActivityInsert: boolean;

  constructor(
    userId: string,
    collectionId: number,
    type: ParticipationType,
    notifyOnActivityInsert = true
  ) {
    super();
    this.userId = userId;
    this.collectionId = collectionId;
    this.type = type;
    this.notifyOnActivityInsert = notifyOnActivityInsert;
  }
}
export { ParticipationType } from "./enums";
