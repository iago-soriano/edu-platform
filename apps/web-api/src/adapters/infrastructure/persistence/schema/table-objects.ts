import {
  users,
  activities,
  activitiesBlocks,
  studentOutputs,
  activitiesGenerated,
} from "./tables";
import {
  ActivitySerializer,
  ActivityBlockSerializer,
  ActivityGeneratedSerializer,
  UserSerializer,
} from "../serializers";
import { TableDefinition } from "@edu-platform/common/platform";
import { StudentOutputSerializer } from "../serializers/studentOutput";

export const usersTable: TableDefinition = {
  table: users,
  serializer: UserSerializer.serialize,
};

export const activitiesGeneratedTable: TableDefinition = {
  table: activitiesGenerated,
  serializer: ActivityGeneratedSerializer.serialize,
};

export const activitiesTable: TableDefinition = {
  table: activities,
  serializer: ActivitySerializer.serialize,
};

export const activitiesBlocksTable: TableDefinition = {
  table: activitiesBlocks,
  serializer: ActivityBlockSerializer.serialize,
};

export const studentOutputTable: TableDefinition = {
  table: studentOutputs,
  serializer: StudentOutputSerializer.serialize,
};
