import {
  usersTable,
  activitiesTable,
  activityVersionsTable,
  activityContentsTable,
  activityQuestionsTable,
  collectionsTable,
  collectionParticipationsTable,
  notificationsTable,
  studentOutputsTable,
} from "../schema/table-objects";

// name of the property must be the name of the class that extends Entity, and the value must be the table it is persisted in
export const AllTables = {
  Activity: activitiesTable,
  ActivityVersion: activityVersionsTable,
  VideoContent: activityContentsTable,
  ImageContent: activityContentsTable,
  TextContent: activityContentsTable,
  Collection: collectionsTable,
  ActivityQuestion: activityQuestionsTable,
  CollectionParticipation: collectionParticipationsTable,
  MultipleChoiceQuestion: activityQuestionsTable,
  TextQuestion: activityQuestionsTable,
  Notification: notificationsTable,
  User: usersTable,
  StudentOutput: studentOutputsTable,
};
