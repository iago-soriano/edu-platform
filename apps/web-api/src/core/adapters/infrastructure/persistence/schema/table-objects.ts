import {
  users,
  activities,
  activityQuestions,
  activityVersions,
  activityContents,
  collectionParticipations,
  collections,
  notifications,
  studentOutputs,
} from "./tables";
import {
  ActivitySerializer,
  ActivityContentSerializer,
  ActivityQuestionSerializer,
  ActivityVersionSerializer,
  CollectionSerializer,
  CollectionParticipationSerializer,
  NotificationSerializer,
  StudentOutputSerializer,
} from "../serializers";
import { TableDefinition } from "@edu-platform/common/platform";

export const activitiesTable: TableDefinition = {
  table: activities,
  serializer: ActivitySerializer.serialize,
};

export const activityVersionsTable: TableDefinition = {
  table: activityVersions,
  serializer: ActivityVersionSerializer.serialize,
};

export const activityContentsTable: TableDefinition = {
  table: activityContents,
  serializer: ActivityContentSerializer.serialize,
};
export const activityQuestionsTable: TableDefinition = {
  table: activityQuestions,
  serializer: ActivityQuestionSerializer.serialize,
};
export const collectionsTable: TableDefinition = {
  table: collections,
  serializer: CollectionSerializer.serialize,
};

export const collectionParticipationsTable: TableDefinition = {
  table: collectionParticipations,
  serializer: CollectionParticipationSerializer.serialize, // TODO
};

export const notificationsTable: TableDefinition = {
  table: notifications,
  serializer: NotificationSerializer.serialize,
};

export const usersTable: TableDefinition = {
  table: users,
  serializer: (args) => args,
};

export const studentOutputsTable: TableDefinition = {
  table: studentOutputs,
  serializer: StudentOutputSerializer.serialize,
};
