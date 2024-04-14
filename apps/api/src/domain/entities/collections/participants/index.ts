import { Entity, CollectionArray } from "@domain/abstract";
import { ParticipationType } from "./enums";

export class CollectionParticipation extends Entity {
  public userId: number = 0;
  public collectionId: number = 0;
  public notifyOnActivityInsert: boolean = true;
  public type: ParticipationType = ParticipationType.Student;
}
export { ParticipationType } from "./enums";
