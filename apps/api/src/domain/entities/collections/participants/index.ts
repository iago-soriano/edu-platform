import { Entity, CollectionArray } from "@domain/abstract";

export enum ParticipationType {
  "Follower",
  "Student",
}

export class CollectionParticipation extends Entity {
  public userId: number = 0;
  public collectionId: number = 0;
  public notifyOnActivityInsert: boolean = true;
  public type: ParticipationType = ParticipationType.Student;
}
