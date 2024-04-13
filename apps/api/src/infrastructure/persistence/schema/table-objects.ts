import {
  activities,
  activityQuestions,
  activityVersions,
  activityContents,
  collectionParticipations,
  collections,
  notifications,
} from "./tables";
import {
  ActivitySerializer,
  ActivityContentSerializer,
  ActivityQuestionSerializer,
  ActivityVersionSerializer,
  CollectionSerializer,
  CollectionParticipationSerializer,
} from "../serializers";
import { PgTable } from "drizzle-orm/pg-core";
import { NotificationSerializer } from "../serializers/notifications";

type TableDefinition = {
  table: PgTable;
  serializer: (args: any) => any;
};
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
