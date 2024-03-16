export enum NotificationType {
  StudentOutputCompleted = "StudentOutputCompleted",
  FeedbackCompleted = "FeedbackCompleted",
  ActivityPublished = "ActivityPublished",
}

export class Notification {
  public id!: number;
  public userId!: number;
  public isNew!: boolean;
  public type!: NotificationType;
  public message!: string;
  public details!: string;
}
