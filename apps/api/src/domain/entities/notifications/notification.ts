import { Entity } from "@domain/abstract";

export enum NotificationType {
  StudentOutputCompleted = "StudentOutputCompleted",
  FeedbackCompleted = "FeedbackCompleted",
  ActivityPublished = "ActivityPublished",
}

export class Notification extends Entity {
  public userId!: number;
  public isUnread!: boolean;
  public type!: NotificationType;
  public message!: string;
  public details!: string;

  public setAsViewed() {
    this.isUnread = false;
  }
}
