export enum NotificationType {
  StudentOutputCompleted = "StudentOutputCompleted",
  FeedbackCompleted = "FeedbackCompleted",
  ActivityPublished = "ActivityPublished",
}

export class Notification {
  public id?: number;
  public userId!: number;
  public isNew!: boolean;
  public type!: NotificationType;
  public message!: string;
  public details!: string;

  buildActivityPublishedNotification(
    versionId: number,
    collectionName: string,
    activityTitle: string,
    userId: number
  ) {
    this.type = NotificationType.ActivityPublished;
    this.message = `A new activity called ${activityTitle} was published in collection ${collectionName}`;
    this.details = JSON.stringify({ versionId });
    this.userId = userId;
  }
  buildStudentOutputCompletedNotification(
    studentOutputId: number,
    studentName: string,
    collectionName: string,
    activityTitle: string,
    userId: number //para quem será enviada a notificação
  ) {
    this.type = NotificationType.StudentOutputCompleted;
    this.details = JSON.stringify({ studentOutputId });
    this.message = `A new output to activity ${activityTitle} was published by ${studentName} in collection ${collectionName}`;
    this.userId = userId;
  }
  buildFeedbackCompletedNotification(
    feedbackId: number,
    activityTitle: string,
    userId: number,
    teacherName: string
  ) {
    this.type = NotificationType.FeedbackCompleted;
    this.details = JSON.stringify({ feedbackId });
    this.message = `A new feedback to activity ${activityTitle} was created by ${teacherName}`;
    this.userId = userId;
  }
}
