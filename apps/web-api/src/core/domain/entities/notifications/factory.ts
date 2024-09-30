import { Notification, NotificationType } from ".";

export class NotificationsFactory {
  static buildActivityPublishedNotification(
    versionId: number,
    collectionName: string,
    activityTitle: string,
    notificationRecipientId: string
  ) {
    const notification = new Notification();

    notification.type = NotificationType.ActivityPublished;
    notification.message = `A new activity, ${activityTitle}, was published in ${collectionName}!`;
    notification.details = JSON.stringify({ versionId });
    notification.userId = notificationRecipientId;

    return notification;
  }

  static buildStudentOutputCreatedNotification(
    studentOutputId: number,
    activityTitle: string,
    createdBy: string,
    notificationRecipientId: string
  ) {
    const notification = new Notification();

    notification.type = NotificationType.StudentOutputCreated;
    notification.details = JSON.stringify({ studentOutputId });
    notification.message = `${createdBy} has started to answer activity ${activityTitle}!`;
    notification.userId = notificationRecipientId;

    return notification;
  }

  static buildStudentOutputCompletedNotification(
    studentOutputId: number,
    activityTitle: string,
    completedBy: string,
    notificationRecipientId: string
  ) {
    const notification = new Notification();

    notification.type = NotificationType.StudentOutputCompleted;
    notification.details = JSON.stringify({ studentOutputId });
    notification.message = `${completedBy} has just completed ${activityTitle}!`;
    notification.userId = notificationRecipientId;

    return notification;
  }

  static buildFeedbackPublishedNotification(
    studentOutputId: number,
    activityTitle: string,
    feedbackBy: string,
    notificationRecipientId: string
  ) {
    const notification = new Notification();

    notification.type = NotificationType.FeedbackCompleted;
    notification.details = JSON.stringify({ studentOutputId });
    notification.message = `${feedbackBy} has just given feedback on ${activityTitle}!`;
    notification.userId = notificationRecipientId;

    return notification;
  }
}
